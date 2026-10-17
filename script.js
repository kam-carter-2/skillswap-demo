
/* AI-assisted code: expands and collapses details on skill cards. */
const detailButtons = document.querySelectorAll(".details-button");

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        details.hidden = isExpanded;
        button.setAttribute("aria-expanded", String(!isExpanded));
        button.textContent = isExpanded
            ? "More information"
            : "Show less";
    });
});
