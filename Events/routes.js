const router = require("express").Router();

const getEvent = require("./controllers/getevent.js");
const registeredEvent = require("./controllers/registerevent.js");

router.get("/getallEvents", getEvent);
router.put("/registerevent", registeredEvent);

module.exports = router;
