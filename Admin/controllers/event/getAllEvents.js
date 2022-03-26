const Event = require("./../../../Events/models/model");
const Admin = require("../adminmodel");
// const Admin = require("./../../../User/model.js");
const jwt = require("jsonwebtoken");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    // return res.status(200).json({ events });
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      console.log(token);
      console.log(decoded.userId);
      Admin.findOne({ _id: decoded.userId }, async (err, admin) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (admin) {
          console.log(events);
          return res.status(200).json({ events });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = getAllEvents;
