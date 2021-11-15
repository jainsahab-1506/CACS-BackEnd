const mongoose = require("mongoose");
const User = require("../../User/model");
const Event = require("../models/model");
const jwt = require("jsonwebtoken");
const markattendance = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        error: "Invalid request headers.",
      });
    }

    const tokenData = authHeader.split(" ")[1];
    if (!tokenData) {
      return res.status(400).json({
        error: "Invalid token.",
      });
    }
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(tokenData, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res.status(500).json({ error: "Unauthorised Request" });
      }
      const id = req.params.id;
      const event = await Event.findOne({ _id: id });
      console.log("Called");
      if (!event) return res.status(400).json({ error: "No such event" });

      if (event.attendedUsers.includes(user._id))
        return res.status(200).json({ error: "Already Attendance Marked" });
      if (event.registeredUsers.includes(user._id)) {
        const updatedevent = await Event.findByIdAndUpdate(id, {
          $push: { attendedUsers: user._id },
        });
        const updateduser = await User.findByIdAndUpdate(user._id, {
          $push: { attendedEvents: updatedevent._id },
        })
          .populate("registeredEvents")
          .populate("attendedEvents");

        return res
          .status(200)
          .json({ success: "Attendance Marked", updateduser });
      } else {
        return res
          .status(200)
          .json({ error: "You are not Registered for the Event." });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = markattendance;
