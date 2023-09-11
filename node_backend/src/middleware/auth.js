const {body} = require("express-validator");
const {validationResult} = require("express-validator");
const { errorResponse } = require("../controller/responseController");
const validateUserRegistration = [
   body("name")
   .trim()
   .notEmpty()
   .withMessage("Name is required")
   .isLength({min: 4,max:31})
   .withMessage("Name should be atlist 4 t0 31 character"),
   body("email")
   .trim()
   .notEmpty()
   .withMessage("Email is required")
   .isEmail()
   .withMessage("Invalid email address"),
   body("password")
   .trim()
   .isLength({min:6})
   .withMessage("Password should be atlist 6 character long")
   .notEmpty()
   .withMessage("Password is required"),
   body("address")
   .trim()
   .notEmpty()
   .withMessage("Address is required"),
   body("phone")
   .trim()
   .notEmpty()
   .withMessage("Phone no. is required"),
   body("image")
   .optional()
   .isString()
]

const validateUserLogin = [
   
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
    body("password")
    .trim()
    .isLength({min:6})
    .withMessage("Password should be atlist 6 character long")
    .notEmpty()
    .withMessage("Password is required"),
   
 ]

 const validateUserPasswordUpdate = [
   
    body("oldassword")
    .trim()
    .isLength({min:6})
    .withMessage("Password should be atlist 6 character long")
    .notEmpty()
    .withMessage("Password is required"),
    body("newPassword")
    .trim()
    .isLength({min:6})
    .withMessage("Password should be atlist 6 character long")
    .notEmpty()
    .withMessage("Password is required"),
   
 ]

 const validateUserForgetPAssword = [
   
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
   
 ]

 const validateUserResetPAssword = [
   
    body("token")
    .trim()
    .notEmpty()
    .withMessage("token is required"),
    body("password")
    .trim()
    .isLength({min:6})
    .withMessage("Password should be atlist 6 character long")
    .notEmpty()
    .withMessage("Password is required"),
   
 ]

const userValidator = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
         errorResponse(res,{
            statusCode:400,
            message: errors.array()[0].msg,
         })
        }
        return next()
    } catch (error) {
         next(error);
    }
}

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserPasswordUpdate,
    validateUserForgetPAssword,
    validateUserResetPAssword,
    userValidator,
}