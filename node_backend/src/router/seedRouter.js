const express = require("express");
const { seedController } = require("../controller/seedController");
const upload = require("../middleware/multer");

const seedRoute = express.Router();

seedRoute.get("/seed",upload.single("image"), seedController);

module.exports = {seedRoute};