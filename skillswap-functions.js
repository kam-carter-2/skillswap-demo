function filterSkillsByCategory(skills, category) {
  if (category === "All") return skills;
  return skills.filter(skill => skill.category === category);
}

function searchSkills(skills, query) {
  const term = query.trim().toLowerCase();
  if (!term) return skills;

  return skills.filter(skill =>
    [skill.title, skill.category, skill.description, skill.type]
      .some(value => String(value || "").toLowerCase().includes(term))
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { filterSkillsByCategory, searchSkills };
}

if (typeof window !== "undefined") {
  window.SkillSwapFunctions = { filterSkillsByCategory, searchSkills };
}
