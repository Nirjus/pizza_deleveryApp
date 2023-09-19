const createError = require("http-errors");
const JWT_token = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const { successResponse } = require("./responseController");
const { findItemById } = require("../services/findItemById");
const {deleteImg} = require("../helper/deleteImage");
const { createJWTToken } = require("../helper/jsonWebToken");
const { jwtActivationKey, frontendUrl, jwtResetPAsswordKey } = require("../secret/secret");
const sendMail = require("../helper/Email");

const getAllUser = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    //   search expresion
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    //  pagination
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();
    if (!users) {
      throw createError(404, "No users Found");
    }

    return successResponse(res, {
      statusCode: 201,
      message: "users info",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    
    const id = req.user._id;
    
    const options = { password: 0 };

    const user = await findItemById(id, User, options);

    return successResponse(res, {
      statusCode: 200,
      message: "User is returned successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findItemById(id, User, options);
      
    await cloudinary.v2.uploader.destroy(user.image.public_id);

    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "User is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address,image } = req.body;

    const userExists = await User.exists({ email: email });

    if (userExists) {
      throw createError(409, "User already exists, please signIn");
    }
    const myCloud = await cloudinary.v2.uploader.upload(image,{
      folder: "pizzaApp",
    })  
    
    // jwt token
    const token = createJWTToken(
      "10m",
      { name, email, password, phone, 
        address, 
      image:{
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
      } 
    },
      jwtActivationKey
    );

    // prepair email with nodemail
    const emailData = {
      email,
      subject: "Account Activation mail",
      html: `
        
           <h2> Hello ${name}</h2>
          <p>Please click here to <a href="${frontendUrl}/api/user/activate/${token}" target="blank">activate your account</a></p>
          
          `,
    };

    //  send mail with node mailer
   await sendMail(emailData);

    return successResponse(res, {
      statusCode: 201,
      message: `please go to your ${email} for activate account`,
      payload: {
        token
      },
    });
  } catch (error) {
    next(error);
  }
};

const processVerify = async (req, res, next) => {
  try {
    
    const token = req.body.token;

   if(!token){
    throw createError(404, "Token not found");
   }
    try {
      const decoded = JWT_token.verify(token, jwtActivationKey);

     if(!decoded){
      throw createError(404, "Unable to register user")
     }
     const userExists = await User.exists({ email: decoded.email });

     if (userExists) {
       throw createError(409, "User already exists, please signIn");
     }
     
    await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: `User is register successfully`,
    });
    } catch (error) {
      if(error.name === "JsonWebTokenError"){
        throw createError(401, "Invalid Token");
      }else{
        throw error;
      }
    }

  } catch (error) {
    next(error);
  }
};


const updateUserById = async (req, res, next) => {
  try {
    const id = req.user._id;
    const options = { password: 0 };
    
    const user = await findItemById(id, User, options);
    
    const updatateOptions = {
      new: true, runValidators: true, context: "query"
    }
    let updates = {};
    const {name,  password, phone, address, image} = req.body;
     
      if(name){
        updates.name = name;
      }
      if(password){
        updates.password = password;
      }
      if(phone){
        updates.phone = phone;
      }
      if(address){
        updates.address = address;
      }
      if(req.body.email){
        throw  new Error("Email can not be updated");
      }
       if(image){
        await cloudinary.v2.uploader.destroy(user.image.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(image,{
          folder: "pizzaApp",
         })

          updates.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          }
       }
       console.log(updates);
   const updateUser =  await User.findByIdAndUpdate(id, updates,updatateOptions ).select("-password");

    return successResponse(res, {
      statusCode: 200,
      message: "User is updated successfully",
      payload: {updateUser},
    });
  } catch (error) {
    next(error);
  }
};

const updateUserUnBanById = async (req, res, next) => {
  try {
    const id = req.params.id;

   await findItemById(id, User);

    const updatateOptions = {
      new: true, runValidators: true, context: "query"
    }
      
   const updateUser =  await User.findByIdAndUpdate(id, {isBanned:false},updatateOptions ).select("-password");

         if(!updateUser){
          throw createError(404, "User was not Unbanned, error occured");
         }
       
    return successResponse(res, {
      statusCode: 200,
      message: "User is UnBanned successfully",
      payload: {updateUser},
    });
  } catch (error) {
    next(error);
  }
};

const updateUserBanById = async (req, res, next) => {
  try {
    const id = req.params.id;

   await findItemById(id, User);

    const updatateOptions = {
      new: true, runValidators: true, context: "query"
    }
      
   const updateUser =  await User.findByIdAndUpdate(id, {isBanned:true},updatateOptions ).select("-password");

         if(!updateUser){
          throw createError(404, "User was not banned, error occured");
         }
       
    return successResponse(res, {
      statusCode: 200,
      message: "User is Banned successfully",
      payload: {updateUser},
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePassword = async (req, res, next) => {
  try {
     const id = req.user._id;
     
     const user = await findItemById(id,User);
    
     if(req.user.email !== user.email){
      throw new Error("You are try to accessing other profile information!");
     }

     const {oldPassword, newPassword} = req.body;

      const comparePassword = await bcrypt.compare(oldPassword, user.password);

      if(!comparePassword){
        throw new Error("User Old Password did not matched");
      }

       const updates = await User.findByIdAndUpdate(id,
        {password: newPassword},
        {new: true}
        ).select("-password");

       return successResponse(res, {
        statusCode:200,
        message: "Password Update successfully",
        payload: {updates},
       })
  } catch (error) {
    next(error);
  }
}

const handleForgetPassword = async (req, res, next) => {
  try {
        
       const {email} = req.body;
        const user = await User.findOne({email: email});

        if(!user){
          throw createError(404, "Email is incorrect");
        }

        const token = createJWTToken(
          "1m",
          { email },
          jwtResetPAsswordKey,
        );
    
        // prepair email with nodemail
        const emailData = {
          email,
          subject: "Reset Password Email",
          html: `
            
               <h2> Hello ${user.name}</h2>
              <p>Please click here to <a href="${frontendUrl}/api/user/reset-password/${token}" target="blank">Reset your Password</a></p>
              
              `,
        };
    
        //  send mail with node mailer
       await sendMail(emailData);
    
        return successResponse(res, {
          statusCode: 200,
          message: `please go to your ${email} for Reset your password`,
          payload: token,
        });

  } catch (error) {
    next(error);
  }
}

const handleResetPassword = async (req, res, next) => {
  try {
      
    const {token, password} = req.body;

    const decoded = jwt.verify(token, jwtResetPAsswordKey);

    if(!decoded){
      throw new Error("Invalid token");
    }

    const updates = await User.findOneAndUpdate(
      {email: decoded.email},
      {password: password},
      {new: true}
      ).select("-password");

      if(!updates){
        throw createError(404, "Password Reset Failed");
      }

       return successResponse(res, {
        statusCode:200,
        message: "Password Reset successfully",
        payload: {updates},
       })
  } catch (error) {
    next(error);
  }
}


module.exports = {
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
};
