// server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "SIT725 Week 5 – MVC Demo" });
});
app.use("/api/projects", projectRoutes);

const port = process.env.PORT || 3004;

async function start() {
  await mongoose.connect("mongodb://localhost:27017/myprojectDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
  app.listen(port, () => console.log(`App listening on port ${port}`));
}

if (require.main === module) {
  start();
}

module.exports = app;