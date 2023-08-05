const express = require("express");
const {SeedController} = require("../Controllers/seedController");

const seedRoute = express.Router();

seedRoute.get("/seed", SeedController);

module.exports = seedRoute;