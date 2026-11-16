const starterSkills = [
  { id: "starter-1", title: "Python Tutoring", category: "Programming", price: 20, description: "Learn Python basics, coding practice, and debugging.", initials: "PY", owner: "Skill Swap Community" },
  { id: "starter-2", title: "Guitar Lessons", category: "Music", price: 15, description: "Learn chords and practice your favorite songs.", initials: "GU", owner: "Skill Swap Community" },
  { id: "starter-3", title: "Resume Review", category: "Career", price: 0, description: "Get feedback on your resume and job applications.", initials: "CV", owner: "Skill Swap Community" },
  { id: "starter-4", title: "Web Development", category: "Programming", price: 25, description: "Learn HTML, CSS, and JavaScript.", initials: "WD", owner: "Skill Swap Community" },
  { id: "starter-5", title: "Graphic Design Basics", category: "Design", price: 0, description: "Explore layout, color, and design fundamentals.", initials: "GD", owner: "Skill Swap Community" }
];

const $ = id => document.getElementById(id);
const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
};

let skills = storage.get("skillswap-skills", starterSkills);
let users = storage.get("skillswap-users", []);
let currentUser = storage.get("skillswap-current-user", null);
let activeCategory = "All";
let accountMode = "register";

function renderSkills() {
  const filtered = window.SkillSwapFunctions
    ? window.SkillSwapFunctions.searchSkills(
        window.SkillSwapFunctions.filterSkillsByCategory(skills, activeCategory),
        $("skill-search").value
      )
    : skills;

  $("skills-list").replaceChildren();

  filtered.forEach(skill => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const icon = document.createElement("div");
    icon.className = "skill-icon";
    icon.textContent = skill.initials || skill.title.slice(0, 2).toUpperCase();

    const category = document.createElement("p");
    category.className = "skill-category";
    category.textContent = skill.category;

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const description = document.createElement("p");
    description.className = "skill-description";
    description.textContent = skill.description;

    const owner = document.createElement("p");
    owner.className = "skill-owner";
    owner.textContent = `Shared by ${skill.owner || "Community"}`;

    const footer = document.createElement("div");
    footer.className = "skill-card-footer";
    const price = document.createElement("strong");
    price.className = "skill-price";
    price.textContent = Number(skill.price) === 0 ? "Free" : `$${skill.price}/hr`;
    const type = document.createElement("span");
    type.textContent = "Skill session";
    footer.append(price, type);

    card.append(icon, category, title, description, owner, footer);
    $("skills-list").append(card);
  });

  $("skill-count").textContent = skills.length;
  $("results-count").textContent = `${filtered.length} ${filtered.length === 1 ? "skill" : "skills"} found`;
  $("empty-message").hidden = filtered.length > 0;
}

function updateAccountUI() {
  $("account-button").textContent = currentUser ? "My account" : "Sign in";
  $("account-section").hidden = !currentUser;
  if (currentUser) {
    $("profile-name").value = currentUser.name || "";
    $("profile-bio").value = currentUser.bio || "";
    $("profile-interests").value = currentUser.interests || "";
  }
}

function showAccount(mode = "register") {
  accountMode = mode;
  $("account-title").textContent = mode === "register" ? "Create your account" : "Welcome back";
  $("account-name-label").hidden = mode === "login";
  $("account-name").hidden = mode === "login";
  $("account-name").required = mode === "register";
  $("account-password").autocomplete = mode === "register" ? "new-password" : "current-password";
  $("account-submit").textContent = mode === "register" ? "Create account" : "Sign in";
  $("register-tab").classList.toggle("active", mode === "register");
  $("login-tab").classList.toggle("active", mode === "login");
  $("account-message").textContent = "";
  $("account-dialog").showModal();
}

$("account-button").addEventListener("click", () => {
  if (currentUser) {
    $("account-section").scrollIntoView({ behavior: "smooth" });
  } else showAccount("login");
});
$("hero-join").addEventListener("click", () => showAccount("register"));
$("register-tab").addEventListener("click", () => showAccount("register"));
$("login-tab").addEventListener("click", () => showAccount("login"));

$("account-form").addEventListener("submit", event => {
  event.preventDefault();
  const email = $("account-email").value.trim().toLowerCase();
  const password = $("account-password").value;
  const name = $("account-name").value.trim();

  if (accountMode === "register") {
    if (!name) return;
    if (users.some(user => user.email === email)) {
      $("account-message").textContent = "An account with this email already exists.";
      return;
    }
    const user = { id: String(Date.now()), name, email, password, bio: "", interests: "" };
    users.push(user);
    storage.set("skillswap-users", users);
    currentUser = user;
  } else {
    const user = users.find(item => item.email === email && item.password === password);
    if (!user) {
      $("account-message").textContent = "Email or password is incorrect.";
      return;
    }
    currentUser = user;
  }

  storage.set("skillswap-current-user", currentUser);
  $("account-dialog").close();
  $("account-form").reset();
  updateAccountUI();
  $("account-section").scrollIntoView({ behavior: "smooth" });
});

$("sign-out-button").addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("skillswap-current-user");
  updateAccountUI();
});

$("profile-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!currentUser) return;
  currentUser.name = $("profile-name").value.trim();
  currentUser.bio = $("profile-bio").value.trim();
  currentUser.interests = $("profile-interests").value.trim();
  users = users.map(user => user.id === currentUser.id ? currentUser : user);
  storage.set("skillswap-users", users);
  storage.set("skillswap-current-user", currentUser);
  $("profile-message").textContent = "Your profile has been saved.";
});

$("create-skill-button").addEventListener("click", () => {
  if (!currentUser) {
    showAccount("register");
    $("account-message").textContent = "Create an account or sign in to publish a skill.";
    return;
  }
  $("skill-message").textContent = "";
  $("skill-dialog").showModal();
});

$("skill-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!currentUser) return;
  const title = $("skill-title").value.trim();
  const category = $("skill-category").value;
  const description = $("skill-description").value.trim();
  const price = Number($("skill-price").value);
  if (!title || !category || !description || !Number.isFinite(price) || price < 0) {
    $("skill-message").textContent = "Please complete every field with a valid price.";
    return;
  }
  skills.unshift({
    id: String(Date.now()),
    title, category, description, price,
    initials: title.slice(0, 2).toUpperCase(),
    owner: currentUser.name
  });
  storage.set("skillswap-skills", skills);
  $("skill-form").reset();
  $("skill-dialog").close();
  activeCategory = "All";
  $("skill-search").value = "";
  document.querySelectorAll(".filter-button").forEach(button => {
    const active = button.dataset.category === "All";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderSkills();
});

$("skill-search").addEventListener("input", renderSkills);

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter-button").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderSkills();
  });
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => $(button.dataset.close).close());
});

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

updateAccountUI();
renderSkills();
