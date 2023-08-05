const createError = require("http-errors");
const Admin = require("../models/user");
const mongoose = require("mongoose");
const fs = require("fs");
const { createToken } = require("../helper/JWT");
const { JWTSecretKey } = require("../secret");
const sendEmailWithNodeMailer = require("../helper/sendEmail");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Product = require("../models/product");

const getallUsers = async (req, res, next) => {
  try {
    const options = { password: 0 };
    const user = await User.find(options);
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

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

const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, "User Not Found");
    } else if (user.role === "admin") {
      throw createError(404, "Admin can not be deleted");
    } else {
      await User.findByIdAndDelete(userId);
    }

    return res.status(200).json({
      success: true,
      message: "User is Deleted successfully",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

const registerNewAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo, address } = req.body;

    const existsUser = await Admin.exists({ email: email });
    if (existsUser) {
      throw createError(409, "You are Alredy exists, so SignIn please");
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
             <h3>This is Admin LogIn, make control your business<h3>
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
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const AdminVerification = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw createError(404, " Token not found");
    }

    const decoded = jwt.verify(token, JWTSecretKey);

    if (!decoded) {
      throw createError(401, "User Not verified!");
    }
    const existsUser = await User.exists({ email: decoded.email });
    if (existsUser) {
      throw createError(409, "You are Alredy exists, so SignIn please");
    }
    await Admin.create(decoded);

    return res.status(201).json({
      success: true,
      message: "User is successfully registered",
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Prduct Not Found");
    } else {
      await Product.findByIdAndDelete(productId);
    }

    return res.status(201).json({
      success: true,
      message: "Product is Deleted successfully",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid Product Id"));
      return;
    }
    next(error);
  }
};


module.exports = {
  getallUsers,
  getUserById,
  deleteUserById,
  registerNewAdmin,
  AdminVerification,
  deleteProductById,
};
