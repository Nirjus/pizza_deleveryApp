const express = require("express");
const { isLogIn, isAdmin } = require("../middleware/userAuth");
const { createEvent, getAllEvents, getSingleEvent, deleteEvent } = require("../controller/eventController");


const eventRoute = express.Router();

eventRoute.post("/create",isLogIn, isAdmin, createEvent);
eventRoute.get("/", getAllEvents);
eventRoute.get("/:slug", getSingleEvent);
eventRoute.delete("/delete/:slug",isLogIn,isAdmin, deleteEvent);


module.exports = eventRoute;
