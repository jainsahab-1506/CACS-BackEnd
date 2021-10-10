const mongoose = require("mongoose");
const User = require("./../../email-group/model");
const Event = require("./../../email-group/model");
const jwt = require("jsonwebtoken");
const getevents = async (req, res) => {
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
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res.status(500).json({ error: "Unauthorised Request" });
      }
      const events = await Event.find({}).populate("registeredUsers");
      events.sort({ startDate: 1 });

      return res.status(200).json({ success: "Data Found", events });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = getevents;
