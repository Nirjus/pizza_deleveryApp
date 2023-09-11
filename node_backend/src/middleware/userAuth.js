const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret/secret");
const createError = require("http-errors");

const isLogIn = async (req, res, next) => {

    try {
     const token =  req.cookies.access_token;
     
     if(!token){
        throw createError(404, "Please Login first");
     }
     const isVerified = jwt.verify(token,jwtAccessKey);
     
     if(!isVerified){
          throw createError(400, "User Not verified");
     }
     req.user = isVerified.user;
     
        next();
    } catch (error) {
        next(error)
    }
}

const isLogOut = async (req, res, next) => {

    try {
     const token =  req.cookies.access_token;
     
     if(token){
        throw createError(400, "User is already Logged In");
     }
   
        next();
    } catch (error) {
        next(error)
    }
}

const isAdmin = async (req, res, next) => {

    try {
       const admin = req.user;
      
       if(admin.isAdmin === false){
        throw createError(403, "You must be an Admin to access this resources");
       }
   
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {isLogIn, isLogOut, isAdmin}