// tests/test-classes.test.js
const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Project = require("../models/project");
const projectRoutes = require("../routes/projectRoutes");
const controller = require("../controllers/projectController");

let mongo;
let testApp;

// Test DB & app bootstrap
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: "testdb" });

  testApp = express();
  testApp.use(express.json());
  testApp.use("/api/projects", projectRoutes);
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
});

// 1. ROUTE TESTS
describe("GET /api/projects", () => {

// Test #1
  it("returns 200 and an array of projects", async () => {
    await Project.insertMany([
      { title: "Seed A", image: "images/a.jpg", link: "A", description: "A" },
      { title: "Seed B", image: "images/b.jpg", link: "B", description: "B" },
    ]);

    const res = await request(testApp).get("/api/projects").expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    expect(res.body).toMatchObject({ statusCode: 200, message: "Success" });
  });

// Test #2
  it("objects have expected fields", async () => {
    await Project.create({ title: "Check Fields" });
    const res = await request(testApp).get("/api/projects").expect(200);
    const p = res.body.data.find((x) => x.title === "Check Fields");
    expect(p).toHaveProperty("_id");
    expect(p).toHaveProperty("title", "Check Fields");
  });
});

// 2. MODEL TESTS
describe("Project model", () => {

// Test #3
  it("requires title", async () => {
    const p = new Project({ description: "No title" });
    let err;
    try {
      await p.validate();
    } catch (e) {
      err = e;
    }
    expect(err).toBeTruthy();
    expect(err.errors).toHaveProperty("title");
  });

// Test #4
  it("saves with minimal fields", async () => {
    const p = await Project.create({ title: "Only Title" });
    expect(p._id).toBeDefined();
    expect(p.title).toBe("Only Title");
  });
});

// 3. CONTROLLER ERROR-PATH TEST
describe("projectController.getAll", () => {
// Test #5
  it("returns 500 when DB throws", async () => {
    const spy = jest.spyOn(Project, "find").mockReturnValue({
      sort: () => Promise.reject(new Error("boom")),
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 500, message: "Server error" })
    );

    spy.mockRestore();
  });
});