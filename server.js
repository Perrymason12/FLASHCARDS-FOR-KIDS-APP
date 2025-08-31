import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "flashcards_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Auth helpers
function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid/expired token" });
  }
}

// AUTH ROUTES
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(409).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hash]);
    const user = { id: result.insertId, email };
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user.id, name, email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const [rows] = await pool.query("SELECT id, name, email, password_hash FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// FLASHCARDS CRUD (per-user)
app.get("/api/flashcards", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, front, back, tag FROM flashcards WHERE user_id = ? ORDER BY id DESC", [req.user.id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/flashcards", auth, async (req, res) => {
  try {
    const { front, back, tag } = req.body;
    if (!front || !back) return res.status(400).json({ error: "front and back are required" });
    const [result] = await pool.query(
      "INSERT INTO flashcards (user_id, front, back, tag) VALUES (?,?,?,?)",
      [req.user.id, front, back || "", tag || null]
    );
    const [row] = await pool.query("SELECT id, front, back, tag FROM flashcards WHERE id = ?", [result.insertId]);
    res.status(201).json(row[0]);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/flashcards/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { front, back, tag } = req.body;
    const [result] = await pool.query(
      "UPDATE flashcards SET front = ?, back = ?, tag = ? WHERE id = ? AND user_id = ?",
      [front, back, tag, id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    const [row] = await pool.query("SELECT id, front, back, tag FROM flashcards WHERE id = ?", [id]);
    res.json(row[0]);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/flashcards/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query("DELETE FROM flashcards WHERE id = ? AND user_id = ?", [id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Serve SPA pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "public", "signup.html")));
app.get("/app", (req, res) => res.sendFile(path.join(__dirname, "public", "app.html")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
