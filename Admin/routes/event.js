const router = require("express").Router();

const createEvent = require("./../controllers/event/createEvent");
const deleteEvent = require("./../controllers/event/deleteEvent");
const getAllEvents = require("./../controllers/event/getAllEvents");
const updateEvent = require("./../controllers/event/updateEvent");
const getEventById = require("./../controllers/event/getEventById");
const getEvent = require("./../../Events/controllers/getevent");
const registerEvent = require("./../../Events/controllers/registerevent");

router.post("/create", createEvent);
router.post("/register", registerEvent);
router.get("/all", getAllEvents);
router.get("/upcoming", getEvent);
router.get("/id", getEventById);
router.put("/update", updateEvent);
router.delete("/delete", deleteEvent);

module.exports = router;
