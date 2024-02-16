const User = require("../models/User")

// LOGIN
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// SIGNUP
const signupUser = async (req, res) => {
  res.json({ mssg: "signup user" });
};

module.exports = { signupUser, loginUser };
