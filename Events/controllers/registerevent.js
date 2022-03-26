const mongoose = require("mongoose");

const Event = require("./../../Events/models/model");
const jwt = require("jsonwebtoken");
const registerevent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.body.eventid });
    console.log(event);

    if (!event) return res.status(400).json({ error: "No such event" });
    const id = req.body.id.toLowerCase();
    const data = {
      id: id,
      name: req.body.name,
      email: req.body.email,
      branch: req.body.branch,
      phone: req.body.phone,
      rank: 100000,
    };
    if (event.registeredUsers.find((user) => user.id === id))
      return res.status(200).json({ error: "Already Registered" });

    const updatedevent = await Event.findByIdAndUpdate(req.body.eventid, {
      $push: { registeredUsers: data },
    });

    return res.status(200).json({ success: "Event Registered" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = registerevent;
