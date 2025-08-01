const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Define schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Create a sample project (run once or guard with condition)
const sampleProjects = [
    {
    title: "Math",
    image: "images/math.jpg",
    link: "Study of numbers, shapes, patterns, quantity, and space",
    description: "It's a fundamental science that uses logic, reasoning, and often symbols and rules to understand and describe relationships in the world and in abstract concepts.",
    },
    {
    title: "English",
    image: "images/English.jpg",
    link: "West Germanic language that originated in England and has become a global lingua franca",
    description: "It's the most widely spoken language in the world when considering both native and non-native speakers. English is an official or national language in numerous countries, including the United Kingdom, the United States, Canada, Australia, and New Zealand.",
    }
];

(async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(sampleProjects);
      console.log("Sample projects inserted!");
    }
  } catch (error) {
    console.error("Error inserting sample projects:", error);
  }
})();

// REST API
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
});

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
