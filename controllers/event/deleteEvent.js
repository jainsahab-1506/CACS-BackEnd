const Event = require("./../../models/event");
const Admin = require("./../../models/admin");
const jwt = require("jsonwebtoken");

const deleteEvent = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      Admin.findOne({ _id: decoded.userId }, (err, admin) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (admin) {
          Event.deleteOne({ id: req.eventId }).then(() => {
            return res.status(200).json({ message: "Event removed." });
          });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = deleteEvent;
