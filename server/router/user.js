const express = require("express");
const { loginUser, signupUser } = require("../controller/userController");

const router = express.Router();

// LOGIN
router.post("/login", loginUser);

// SIGNUP
router.post("/signup", signupUser);

module.exports = router;
