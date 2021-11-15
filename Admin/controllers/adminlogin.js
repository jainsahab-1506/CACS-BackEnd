const mongoose = require("mongoose");
const User = require("./../../User/model");
const Admin = require("./../../User/adminmodel");
const Event = require("./../../Events/models/model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    let email = req.body.email;
    email = email.toLowerCase();
    const userData = {
      name: req.body.name,
      email: email,
      phone: req.body.phone,
      password: req.body.password,
    };
    console.log("User Data: ", userData);
    const user = await Admin.find({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET
    );

    return res.status(200).json({ success: "Data Found", token });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = login;
