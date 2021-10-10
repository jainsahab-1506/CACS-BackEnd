const mongoose = require("mongoose");
const User = require("./../../User/model");
const Event = require("./../../Events/models/model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await User.findOne(userData).populate("registeredEvents");
    if (!user) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET
    );
    var userdata = {
      token: token,
      user: user,
    };
    return res.status(200).json({ success: "Data Found", userdata });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = login;
