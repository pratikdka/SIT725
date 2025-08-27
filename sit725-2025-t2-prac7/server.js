// server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");

// Added http + socket.io
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/projects", projectRoutes);
app.get("/", (req, res) => {
  res.render("index", { title: "SIT725 Week 5 – MVC Demo" });
});

// Created HTTP server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*"}
});

// Added basic socket handlers
io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
  socket.emit("server:hello", { msg: "Welcome from server via Socket.IO" });

  socket.on("client:ping", (payload) => {
    console.log("client:ping", payload);
    socket.emit("server:pong", { at: new Date().toISOString() });
  });

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
  });
});

// Database
mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  server.listen(port, () => console.log(`App listening on port ${port}`));
});
