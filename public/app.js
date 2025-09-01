function authFetch(path, opts={}){
  const token = localStorage.getItem("token");
  if(!token){ location.href = "/login"; return; }
  const headers = Object.assign({ "Content-Type":"application/json", "Authorization":"Bearer "+token }, opts.headers||{});
  return fetch(path, { ...opts, headers });
}

const listEl = document.getElementById("cardsList");
const form = document.getElementById("cardForm");
const clearBtn = document.getElementById("clearForm");
const search = document.getElementById("search");
const logoutBtn = document.getElementById("logoutBtn");
const showCardsBtn = document.getElementById("showCardsBtn");
const cardsContainer = document.getElementById("cardsContainer");

const studyFront = document.getElementById("studyFront");
const studyBack = document.getElementById("studyBack");
const flipBtn = document.getElementById("flipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let cards = [];
let filtered = [];
let index = 0;

function renderList() {
  if(!listEl) return;
  listEl.innerHTML = "";
  filtered.forEach(c => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.innerHTML = `<strong>${escapeHtml(truncate(c.front, 60))}</strong><br><span class="muted">${escapeHtml(truncate(c.back, 80))}</span>`;
    const right = document.createElement("div");
    right.className = "row";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = c.tag || "untagged";
    const edit = document.createElement("button");
    edit.className = "btn";
    edit.textContent = "Edit";
    edit.onclick = () => fillForm(c);
    const del = document.createElement("button");
    del.className = "btn";
    del.textContent = "Delete";
    del.onclick = () => removeCard(c.id);
    right.append(tag, edit, del);
    li.append(meta, right);
    listEl.append(li);
  });
}

function fillForm(c){
  form.id.value = c.id;
  form.front.value = c.front;
  form.back.value = c.back;
  form.tag.value = c.tag || "";
}

function truncate(s, n){ return s.length>n ? s.slice(0,n-1) + "…" : s; }
function escapeHtml(s){ return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }

function applyFilter(){
  const q = (search.value || "").toLowerCase();
  filtered = cards.filter(c => (c.front+c.back).toLowerCase().includes(q) || (c.tag||"").toLowerCase().includes(q));
  if(index>=filtered.length) index = 0;
  renderList();
  renderStudy();
}

async function loadCards(){
  const res = await authFetch("/api/flashcards");
  if(!res.ok){ if(res.status===401){ localStorage.removeItem("token"); location.href="/login"; return; } }
  cards = await res.json();
  filtered = cards.slice();
  index = 0;
  renderList();
  renderStudy();
}

async function saveCard(e){
  e.preventDefault();
  const payload = { front: form.front.value.trim(), back: form.back.value.trim(), tag: form.tag.value.trim() || null };
  if(!payload.front || !payload.back) return alert("Front and Back are required.");
  if(form.id.value){
    const res = await authFetch(`/api/flashcards/${form.id.value}`, { method:"PUT", body: JSON.stringify(payload) });
    if(res.ok){
      const updated = await res.json();
      const i = cards.findIndex(c => c.id === updated.id);
      if(i>-1) cards[i] = updated;
    }
  } else {
    const res = await authFetch("/api/flashcards", { method:"POST", body: JSON.stringify(payload) });
    if(res.ok){
      const created = await res.json();
      cards.unshift(created);
    }
  }
  form.reset();
  applyFilter();
}

async function removeCard(id){
  if(!confirm("Delete this card?")) return;
  const res = await authFetch(`/api/flashcards/${id}`, { method:"DELETE" });
  if(res.ok){
    cards = cards.filter(c => c.id !== id);
    applyFilter();
  }
}

function renderStudy(){
  if(!filtered.length){
    studyFront.textContent = "No cards yet. Add some on the left!";
    studyBack.textContent = "";
    studyBack.classList.add("hidden");
    return;
  }
  const c = filtered[index];
  studyFront.textContent = c.front;
  studyBack.textContent = c.back;
  studyBack.classList.add("hidden");
}

function flip(){ studyBack.classList.toggle("hidden"); }
function next(){ if(!filtered.length) return; index = (index+1) % filtered.length; renderStudy(); }
function prev(){ if(!filtered.length) return; index = (index-1+filtered.length) % filtered.length; renderStudy(); }

if(form) form.addEventListener("submit", saveCard);
if(clearBtn) clearBtn.addEventListener("click", () => form.reset());
if(search) search.addEventListener("input", applyFilter);
if(flipBtn) flipBtn.addEventListener("click", flip);
if(nextBtn) nextBtn.addEventListener("click", next);
if(prevBtn) prevBtn.addEventListener("click", prev);
if(logoutBtn) logoutBtn.addEventListener("click", () => { localStorage.removeItem("token"); location.href = "/"; });

if(showCardsBtn) showCardsBtn.addEventListener("click", () => {
  const isHidden = cardsContainer.style.display === "none";
  cardsContainer.style.display = isHidden ? "block" : "none";
  showCardsBtn.textContent = isHidden ? "Hide Cards Stored" : "Show Cards Stored";
});

loadCards();