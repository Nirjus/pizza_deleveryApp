const createError = require("http-errors");
const User = require("../models/user");
const {createToken} = require("../helper/JWT");
const { JWTSecretKey } = require("../secret");
const sendEmailWithNodeMailer = require("../helper/sendEmail");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const filter = { password: 0 };
    const user = await User.findById(userId, filter);
    if (!user) {
      throw createError(404, "User not exists with this Id!");
    }
    return res.status(200).json({
      success: true,
      message: "User is returned successfully",
      user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

const registerNewUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo, address } = req.body;

    const existsUser = await User.exists({email: email});
    if(existsUser){
       throw createError(409,"You are Alredy exists, so SignIn please")
    }

    const token = createToken(
      { name, email, password, phoneNo, address },
      JWTSecretKey,
      "10m"
    );
    // preparing email
    const emailData = {
      email,
      subject: "User Activation",
      html: ` <h2>Hello ${name}!</h2>
               <h4>Activate your account click this link bellow </h4>
               <p style="background-color:#4CC417; font-weight:600; width:200px; height:60px; text-align:center; border-radius:10px; color:white; font-size:1.1rem; padding-top:20px"> click--> <a href="http://localhost:3000/api/v2/users/activation/${token}">ACTIVATE</a></p>
        `,
    };

    try {
      await sendEmailWithNodeMailer(emailData);
    } catch (error) {
     next(createError(500, "Failed to send email"));
      return;
    }
     res.status(200).json({
      success: true,
      message: `Please go to your email: ${email} for compleating registartion process`,
      token:token,
    });
  } catch (error) {
    next(error);
  }
};

const UserVerification = async (req, res, next) => {
  try {
    
    const token = req.body.token;
    if(!token){
      throw createError(404, " Token not found");
    }

      const decoded = jwt.verify(token, JWTSecretKey);
  
      if(!decoded){
      throw  createError(401,"User Not verified!");
      }
      const existsUser = await User.exists({email: decoded.email});
      if(existsUser){
        throw createError(409,"You are Alredy exists, so SignIn please")
      }
      await User.create(decoded);

     return res.status(201).json({
        success: true,
        message: "User is successfully registered",
      })
    

  } catch (error) {
     next(error);
  }
};

module.exports = { getUserById,registerNewUser, UserVerification };
