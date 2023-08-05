const express = require("express");
const {
  getUserById,
  registerNewUser,
  UserVerification,
} = require("../Controllers/userController");

const getUsers = express.Router();

getUsers.get("/profile", getUserById);
getUsers.post("/users-ragistration", registerNewUser);
getUsers.post("/users-verify", UserVerification);

module.exports = getUsers;
