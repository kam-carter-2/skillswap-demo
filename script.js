
cat > script.js <<'EOF'
const skills = [
    { title: "Python Tutoring", category: "Programming", price: 20, description: "Learn Python basics, coding practice, and debugging.", initials: "PY" },
    { title: "Guitar Lessons", category: "Music", price: 15, description: "Learn chords and practice your favorite songs.", initials: "GU" },
    { title: "Resume Review", category: "Career", price: 0, description: "Get feedback on your resume and job applications.", initials: "CV" },
    { title: "Web Development", category: "Programming", price: 25, description: "Learn HTML, CSS, and JavaScript.", initials: "WD" }
];

const skillsList = document.getElementById("skills-list");
const skillCount = document.getElementById("skill-count");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

function renderSkills(category = "All") {
    const filtered = window.SkillSwapFunctions.filterSkillsByCategory(skills, category);
    skillsList.replaceChildren();

    filtered.forEach(skill => {
        const card = document.createElement("article");
        card.className = "skill-card";

        const icon = document.createElement("div");
        icon.className = "skill-icon";
        icon.textContent = skill.initials;

        const categoryLabel = document.createElement("p");
        categoryLabel.className = "skill-category";
        categoryLabel.textContent = skill.category;

        const title = document.createElement("h3");
        title.textContent = skill.title;

        const description = document.createElement("p");
        description.className = "skill-description";
        description.textContent = skill.description;

        const footer = document.createElement("div");
        footer.className = "skill-card-footer";

        const price = document.createElement("span");
        price.className = "skill-price";
        price.textContent = skill.price === 0 ? "Free" : `$${skill.price}/hr`;

        const type = document.createElement("span");
        type.className = "skill-type";
        type.textContent = "Skill session";

        footer.append(price, type);
        card.append(icon, categoryLabel, title, description, footer);
        skillsList.appendChild(card);
    });

    skillCount.textContent = `${filtered.length} ${filtered.length === 1 ? "skill" : "skills"}`;
    emptyMessage.hidden = filtered.length > 0;
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });

        renderSkills(button.dataset.category);
    });
});

renderSkills();
EOF
