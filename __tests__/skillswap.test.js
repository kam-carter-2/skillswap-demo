const {
  filterSkillsByCategory,
  searchSkills
} = require("../skillswap-functions");

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20, description: "Learn Python" },
  { title: "Guitar Lessons", category: "Music", price: 15, description: "Learn chords" },
  { title: "Resume Review", category: "Career", price: 0, description: "Career feedback" },
  { title: "Web Development", category: "Programming", price: 25, description: "Learn HTML and CSS" }
];

describe("filterSkillsByCategory", () => {
  test("filters skills by category", () => {
    expect(filterSkillsByCategory(skills, "Programming")).toEqual([skills[0], skills[3]]);
  });

  test("returns every skill when category is All", () => {
    expect(filterSkillsByCategory(skills, "All")).toEqual(skills);
  });

  test("returns an empty array when no skills match", () => {
    expect(filterSkillsByCategory(skills, "Cooking")).toEqual([]);
  });

  test("includes free skills in their category", () => {
    expect(filterSkillsByCategory(skills, "Career")).toEqual([skills[2]]);
  });
});

describe("searchSkills", () => {
  test("searches skill titles without case sensitivity", () => {
    expect(searchSkills(skills, "python")).toEqual([skills[0]]);
  });

  test("searches descriptions", () => {
    expect(searchSkills(skills, "HTML")).toEqual([skills[3]]);
  });

  test("returns all skills for an empty search", () => {
    expect(searchSkills(skills, "  ")).toEqual(skills);
  });
});
