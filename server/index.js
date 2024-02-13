require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

// routes

// GET ALL
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An error occured while fetching notes...");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

// GET SINGLE NOTE
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const data = await Notes.findById(noteID);
    if (!data) {
      throw new Error("Note not found");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Note not found" });
  }
});

// CREATE NOTE
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An error occured while creating note...");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating note..." });
  }
});

// UPDATE NOTE
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteID, { title, description });
    if (!data) {
      throw new Error("Error occured while updating note");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occured while updating note" });
  }
});

// DELETE NOTE
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const data = await Notes.findByIdAndDelete(noteID);
    if (!data) {
      throw new Error("Error occured while deleting note");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occured while deleting note" });
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("*", (req, res) => {
  res.json("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
