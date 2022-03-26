const mongoose = require("mongoose");
const Event = require("../models/model");

const jwt = require("jsonwebtoken");
const getevents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ startDate: 1 });
    console.log(events);
    return res.status(200).json({ success: "Data Found", events });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = getevents;
