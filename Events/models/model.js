const mongoose = require("mongoose");
//const User = require("./../messages/models");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  venue: { type: String, required: true },
  registeredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = new mongoose.model("Event", eventSchema);
