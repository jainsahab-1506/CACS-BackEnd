const Event = require("./../../../Events/models/model");
const Admin = require("./../../../User/model");
const jwt = require("jsonwebtoken");

const getEventById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      Admin.findOne({ _id: decoded.userId }, async (err, admin) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (admin) {
          const event = await Event.findById(req.body.eventId);
          if (event) return res.status(200).json({ event });
          else return res.status(200).json({ message: "No such event." });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = getEventById;
