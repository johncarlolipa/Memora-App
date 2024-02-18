require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const userRoutes = require("./router/user");
const requireAuth = require("./middleware/requireAuth");
const notes = require("./router/note");


const app = express();
app.use(
  cors({
    origin: ["https://memora-app.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 8000;

// middleware
connectDB();
app.use(cors());
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

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("*", (req, res) => {
  res.json("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
