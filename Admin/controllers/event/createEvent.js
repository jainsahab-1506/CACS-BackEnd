const Event = require("./../../../Events/models/model");
const Admin = require("../adminmodel");
const jwt = require("jsonwebtoken");

const createEvent = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      Admin.findOne({ _id: decoded.userId }, async (err2, admin) => {
        if (err) {
          return res.status(500).json({ error: err2 });
        }
        if (admin) {
          const event = await Event.create(req.body);
          return res.status(202).json({ message: "Event added.", event });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = createEvent;
