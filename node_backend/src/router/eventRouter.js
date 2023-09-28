const express = require("express");
const { isLogIn, isAdmin } = require("../middleware/userAuth");
const { createEvent, getAllEvents, deleteEvent } = require("../controller/eventController");


const eventRoute = express.Router();

eventRoute.post("/create",isLogIn, isAdmin, createEvent);
eventRoute.get("/", getAllEvents);
eventRoute.get("/admin",isLogIn,isAdmin, getAllEvents);
eventRoute.delete("/delete/:slug",isLogIn,isAdmin, deleteEvent);


module.exports = eventRoute;
