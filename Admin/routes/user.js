const router = require("express").Router();

const createUser = require("./../controllers/user/createUser");
const deleteUser = require("./../controllers/user/deleteUser");
const getAllUsers = require("./../controllers/user/getAllUsers");
const updateUser = require("./../controllers/user/updateUser");
const getUserById = require("./../controllers/user/getUserById");
const loginUser = require("./../../User/controllers/login");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/id", getUserById);
router.put("/create", updateUser);
router.delete("/create", deleteUser);

module.exports = router;
