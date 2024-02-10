require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express()
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json("hello")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on Port: ${PORT}`)
})

