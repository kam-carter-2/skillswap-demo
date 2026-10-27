
const skills = [
    {
        title: "Python Tutoring",
        category: "Programming",
        price: 20,
        description: "Get help with Python basics, coding practice, and debugging.",
        initials: "PY"
    },
    {
        title: "Guitar Lessons",
        category: "Music",
        price: 15,
        description: "Learn chords, practice songs, and build your guitar skills.",
        initials: "GU"
    },
    {
        title: "Resume Review",
        category: "Career",
        price: 0,
        description: "Get feedback on your resume and improve your job applications.",
        initials: "CV"
    },
    {
        title: "Web Development",
        category: "Programming",
        price: 25,
        description: "Learn how to build websites with HTML, CSS, and JavaScript.",
        initials: "WD"
    }
];

const skillsList = document.getElementById("skills-list");
const skillCount = document.getElementById("skill-count");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

function renderSkills(category = "All") {
    const filteredSkills =
        window.SkillSwapFunctions.filterSkillsByCategory(skills, category);

    skillsList.replaceChildren();

    filteredSkills.forEach((skill) => {
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

        const label = document.createElement("span");
        label.className = "skill-type";
        label.textContent = "Skill session";

        footer.append(price, label);
        card.append(icon, categoryLabel, title, description, footer);
        skillsList.appendChild(card);
    });

    skillCount.textContent =
        `${filteredSkills.length} ${filteredSkills.length === 1 ? "skill" : "skills"}`;

    emptyMessage.hidden = filteredSkills.length !== 0;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        filterButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        renderSkills(selectedCategory);
    });
});

renderSkills();
