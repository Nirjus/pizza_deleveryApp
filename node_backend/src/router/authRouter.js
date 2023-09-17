const express = require("express");
const { loginController, logoutController, handleRefreshToken, handleProtectedRoute } = require("../controller/authController");
const { isLogOut, isLogIn } = require("../middleware/userAuth");
const { validateUserLogin, userValidator } = require("../middleware/auth");

const authRoute = express.Router();

authRoute.post("/login",validateUserLogin, userValidator,isLogOut,loginController);
authRoute.get("/logout",isLogIn, logoutController);
authRoute.get("/refresh-token", handleRefreshToken);
authRoute.get("/protected", handleProtectedRoute);

module.exports = {authRoute}