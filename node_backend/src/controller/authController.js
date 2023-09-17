const User = require("../models/UserModel");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { createJWTToken } = require("../helper/jsonWebToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtAccessKey, jwtRefreshKey } = require("../secret/secret");


const loginController = async (req, res, next) => {

    try {
        // get user email and password from re.body to verify
        const {email, password} = req.body;
        // if user exists?
        const user = await User.findOne({email});
       if(!user){
        throw createError(404, "User not exists with this email, please register first");
       }
        // compare password
     const comparePassword = await bcrypt.compare(password,user.password);
     if(!comparePassword){
        throw createError(404, "Password does not matched");
     }

     const withOutPassword = await user.toObject();  //  create a copy of user objected
     delete withOutPassword.password;  // delete the password field and return it
     // check Banned user not
       const isBan = user.isBanned;
       if(isBan){
        throw new Error("You are Banned for this site, contact to authority");
       }
       //   create a token and store it 
       const accessToken = createJWTToken("7d",{user},jwtAccessKey);
       // save it as a cookie
       res.cookie("access_token",accessToken,{
        maxAge: 7*24*60*60*1000, // 7day
        httpOnly: true,
        secure: true,
        sameSite: "none",
       })

       const refreshToken = createJWTToken("7d",{user},jwtRefreshKey);
       // save it as a cookie
       res.cookie("refresh_token",refreshToken,{
        maxAge: 7*24*60*60*1000,  // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "none",
       })

       return successResponse(res, {
        statusCode:200,
        message: "User Logged in Successfully",
        payload: {withOutPassword}
       })
        
    } catch (error) {
        next(error);
    }
}

const logoutController = async (req, res, next) => {

    try {
           res.clearCookie("access_token");
           res.clearCookie("refresh_token");

        return successResponse(res, {
            statusCode: 200,
            message: "User Logged out Successfully",
            payload:{}
        })
    } catch (error) {
        next(error);
    }
}


const handleRefreshToken = async (req, res, next) => {

    try {
         const oldRefreshToken = req.cookies.refresh_token;

         //  verify 
         const decoded = jwt.verify(oldRefreshToken, jwtRefreshKey);

         if(!decoded){
            throw createError(401, "Invalid refresh token");
         }

         const accessToken = createJWTToken("5m",decoded.user,jwtAccessKey);
       // save it as a cookie
       res.cookie("access_token",accessToken,{
        maxAge: 5*60*1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
       })

        return successResponse(res, {
            statusCode: 200,
            message: "New accessToken is generated Successfully",
            payload:{}
        })
    } catch (error) {
        next(error);
    }
}

const handleProtectedRoute = async (req, res, next) => {

    try {
         const accessToken = req.cookies.access_token;

         //  verify 
         const decoded = jwt.verify(accessToken, jwtAccessKey);

         if(!decoded){
            throw createError(401, "Invalid access token");
         }

        return successResponse(res, {
            statusCode: 200,
            message: "Protected recorces access successfully",
            payload:{}
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {loginController, logoutController, handleRefreshToken, handleProtectedRoute}