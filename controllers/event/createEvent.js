const Event = require("./../../models/event");
const Admin = require("./../../models/admin");
const jwt = require("jsonwebtoken");

const createEvent = (req, res) => {
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
            const event = await Event( req.eventData );
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