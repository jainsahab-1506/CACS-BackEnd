const router = require("express").Router();

const getEvent = require("./controllers/getevent.js");
const registeredEvent = require("./controllers/registerevent.js");
const markattendance = require("./controllers/mark attendance.js");

router.get("/getallEvents", getEvent);
router.put("/registerevent", getEmailGroup);
router.put("/markattendance", markattendance);

module.exports = router;
