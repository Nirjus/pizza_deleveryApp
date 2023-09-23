const express = require("express");
const {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
} = require("../controller/categoryController");
const { isAdmin, isLogIn } = require("../middleware/userAuth");

const categoryRoter = express.Router();

categoryRoter.post(
  "/create",
  isLogIn,
  isAdmin,
  createCategory
);
categoryRoter.get("/", getAllCategory);
categoryRoter.get("/admin",isLogIn, isAdmin,getAllCategory);
categoryRoter.get("/:slug", getSingleCategory);
categoryRoter.delete("/delete/:slug", isLogIn, isAdmin, deleteCategory);
categoryRoter.put("/update", isLogIn, isAdmin, updateCategory);

module.exports = { categoryRoter };
