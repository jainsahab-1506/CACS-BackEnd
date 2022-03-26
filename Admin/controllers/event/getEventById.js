const Event = require("./../../../Events/models/model");

const Admin = require("../adminmodel");
const jwt = require("jsonwebtoken");

const getEventById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const jwtSecret = process.env.JWT_SECRET;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        Admin.findOne({ _id: decoded.userId }, async (err, admin) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          if (admin) {
            const event = await Event.findById(req.params.id).sort({
              "registeredUsers.rank": 1,
            });

            if (event) return res.status(200).json({ eventdata: event });
            else return res.status(200).json({ message: "No such event." });
          }
        });
      });
    } else {
      const event = await Event.findById(req.params.id);
      if (event) return res.status(200).json({ eventdata: event });
      else return res.status(200).json({ message: "No such event." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = getEventById;
