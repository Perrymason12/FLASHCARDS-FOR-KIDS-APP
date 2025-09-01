async function api(path, opts = {}) {
  const token = localStorage.getItem("token");
  const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const email = form.get("email");
    const password = form.get("password");
    try {
      const { token } = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      localStorage.setItem("token", token);
      location.href = "/app";
    } catch (err) {
      document.getElementById("loginError").textContent = err.message;
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(signupForm);
    const payload = Object.fromEntries(form.entries());
    try {
      const { token } = await api("/api/auth/signup", { method: "POST", body: JSON.stringify(payload) });
      localStorage.setItem("token", token);
      location.href = "/app";
    } catch (err) {
      document.getElementById("signupError").textContent = err.message;
    }
  });
}
