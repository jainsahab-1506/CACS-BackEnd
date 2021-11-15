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
      email: email,
      password: req.body.password,
    };
    console.log(userData);
    console.log(Admin);
    const user = await Admin.find({});
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    const token = jwt.sign(
      {
        userId: admin._id,
      },
      process.env.SECRET
    );

    var userdata = {
      token: token,
    };
    console.log(userdata);
    return res.status(200).json({ success: "Data Found", userdata });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = login;
