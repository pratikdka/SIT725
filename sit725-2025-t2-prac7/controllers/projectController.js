const Project = require("../models/project");

async function ensureSeedData() {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany([
      {
        title: "Math",
        image: "images/math.jpg",
        link: "Study of numbers, shapes, patterns, quantity, and space",
        description:
          "It's a fundamental science that uses logic and reasoning to understand relationships in the world and in abstract concepts."
      },
      {
        title: "English",
        image: "images/English.jpg",
        link: "A global language with origins in England",
        description:
          "Widely spoken across the world by native and non-native speakers; official in many countries."
      }
    ]);
    console.log("Sample projects inserted");
  }
}

exports.getAll = async (req, res) => {
  try {
    await ensureSeedData();
    const projects = await Project.find({}).sort({ title: 1 });
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};
