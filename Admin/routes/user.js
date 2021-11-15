const router = require("express").Router();

const createUser = require("./../controllers/user/createUser");
const deleteUser = require("./../controllers/user/deleteUser");
const getAllUsers = require("./../controllers/user/getAllUsers");
const updateUser = require("./../controllers/user/updateUser");
const getUserById = require("./../controllers/user/getUserById");
const loginUser = require("./../../User/controllers/login");
const adminlogin = require("./../controllers/adminlogin");
router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/adminlogin", adminlogin);
router.get("/all", getAllUsers);
router.get("/id", getUserById);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
