const Event = require("./../../../Events/models/model");
const Admin = require("./../../../User/model");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    // const user = await Admin.create(req.body);
    // const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    // console.log(token);
    // return res.status(202).json({ message: "User added.", user, token });
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
          const user = await Admin.create(req.body);
          const token = await jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET
          );
          return res.status(202).json({ message: "User added.", user, token });
        } else {
          return res.status(500).json({ error: "No such admin." });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = createUser;
