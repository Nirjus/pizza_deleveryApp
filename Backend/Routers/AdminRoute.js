const express = require("express");
const upload = require("../middleware/multer");
const {
  registerNewAdmin,
  AdminVerification,
  
  getallUsers,
  getUserById,
  deleteUserById,
  deleteProductById,
} = require("../Controllers/AdminController");

const adminAction = express.Router();

adminAction.get("/users", getallUsers);
adminAction.post("/Admin-ragistration", upload.single("images"), registerNewAdmin);
adminAction.post("/Admin-verify", AdminVerification);
adminAction.get("/users/:id", getUserById);
adminAction.delete("/users/:id", deleteUserById);
adminAction.delete("/delete-product", deleteProductById);

module.exports = adminAction;
