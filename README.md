# MoE Flashcards (HTML/CSS/JS + Node.js + MySQL)

A simple, secure flashcards app for learners with JWT-based login/signup.

## 1) Prerequisites
- Node.js 18+ and npm
- MySQL 8+
- Create a database user with privileges or use root in development

## 2) Setup
```bash
cd flashcards-learning-app
cp .env.example .env
# Edit .env to match your MySQL credentials
npm install
# Initialize DB
mysql -u root -p < db.sql
# Run server
npm run dev
```

Visit http://localhost:4000

## 3) API Overview
- `POST /api/auth/signup` { name, email, password } -> { token, user }
- `POST /api/auth/login` { email, password } -> { token, user }
- `GET /api/flashcards` (auth) -> user cards
- `POST /api/flashcards` (auth) -> create { front, back, tag? }
- `PUT /api/flashcards/:id` (auth) -> update
- `DELETE /api/flashcards/:id` (auth) -> delete

## 4) Notes
- Change `JWT_SECRET` before deploy.
- Behind a reverse-proxy, add HTTPS and secure cookies if migrating to cookie auth.
- For classrooms, add "sets" and sharing; this starter is per-user.
