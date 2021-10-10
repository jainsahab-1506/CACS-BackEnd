const mongoose = require("mongoose");
const User = require("./../../User/model");
const Event = require("./../../Events/models/model");
const jwt = require("jsonwebtoken");
const registerevent = async (req, res) => {
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
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res.status(500).json({ error: "Unauthorised Request" });
      }
      const id = req.body.eventid;
      const events = await Event.find({ _id: id });
      if (
        events.registeredUsers.includes(user._id) &&
        user.registeredEvents.includes(id)
      ) {
        return res.status(500).json({ error: "Already Registered" });
      }

      const updatedevent = await Event.findbyIdAndUpdate(id, {
        $push: { registeredUsers: user._id },
      });
      const updateduser = await User.findbyIdAndUpdate(user._id, {
        $push: { registeredEvents: updatedevent._id },
      }).populate("registeredEvents");

      return res.status(200).json({ success: "Event Registered", updateduser });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = registerevent;
