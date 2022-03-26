const Event = require("./../../../Events/models/model");
const Admin = require("../adminmodel");
const jwt = require("jsonwebtoken");

const updateRank = async (req, res) => {
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
          const updatedevent = await Event.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                registeredUsers: req.body,
              },
            },
            { new: true }
          );
          return res
            .status(200)
            .json({ message: "Rank Updated.", updatedevent });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = updateRank;
