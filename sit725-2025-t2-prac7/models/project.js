const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  link: String,
  description: String
});

module.exports = mongoose.model("Project", ProjectSchema);