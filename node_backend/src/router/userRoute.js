const express = require("express");
const {
  getAllUser,
  getUserById,
  deleteUserById,
  processRegister,
  processVerify,
  updateUserById,
  updateUserBanById,
  updateUserUnBanById,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
} = require("../controller/userController");

const { validateUserRegistration, userValidator, validateUserPasswordUpdate, validateUserForgetPAssword, validateUserResetPAssword } = require("../middleware/auth");
const { isLogIn, isLogOut, isAdmin } = require("../middleware/userAuth");

const userRoute = express.Router();

userRoute.post("/register", isLogOut,validateUserRegistration,userValidator ,processRegister);
userRoute.post("/verify", isLogOut,processVerify);
userRoute.put("/reset-password", validateUserResetPAssword, userValidator,handleResetPassword);
userRoute.put("/update",isLogIn, updateUserById);
userRoute.put("/ban-user/:id",isLogIn,isAdmin, updateUserBanById);
userRoute.put("/unban-user/:id",isLogIn, isAdmin, updateUserUnBanById);
userRoute.get("/",isLogIn,isAdmin, getAllUser);
userRoute.get("/me", isLogIn,getUserById);
userRoute.delete("/:id",isLogIn,isAdmin, deleteUserById);
userRoute.put("/update-password", isLogIn,handleUpdatePassword);
userRoute.post("/forget-password", validateUserForgetPAssword, userValidator,handleForgetPassword);


module.exports = { userRoute };
