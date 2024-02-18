require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const userRoutes = require("./router/user");
const requireAuth = require("./middleware/requireAuth");
const notes = require("./router/note");
const fetch = require('node-fetch');

const app = express();

// Use CORS middleware before any routes are defined
app.use(
  cors({
    origin: ["https://memora-app.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;

// middleware
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});

// routes
app.use("/api/user", userRoutes);
// require auth for all notes routes
app.use(requireAuth);
app.use("/api/notes", notes);

// Proxy DELETE requests to the notes API
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const apiUrl = `https://notesapp-backend-server.vercel.app/api/notes/${id}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(response.status).json(await response.json());
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Proxy PUT requests to the notes API
app.put("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const apiUrl = `https://notesapp-backend-server.vercel.app/api/notes/${id}`;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    res.status(response.status).json(await response.json());
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
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
