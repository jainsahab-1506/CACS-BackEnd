const mongoose = require("mongoose");
const User = require("./../../User/model");
const Event = require("./../../Events/models/model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    let email = req.body.email;
    email = email.toLowerCase();
    const userData = {
      email: email,
      password: req.body.password,
    };
    console.log(userData);
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
    const userToBeSent = {
      name: user.name, email: user.email, phone: user.phone, registeredEvents: user.registeredEvents
    };
    var userdata = {
      token: token,
      user: userToBeSent,
    };
    console.log(userdata);
    return res.status(200).json({ success: "Data Found", userdata });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = login;
