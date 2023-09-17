const mongoose = require("mongoose");
const bcryptJS = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required field"],
      maxlength: [30, "Your name must be less then 30 character"],
      minlength: [4, "Your name contain atlist 4 character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Enter valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
      minlength: [6, "Your password contain atlist 6 character"],
      set: (v) => bcryptJS.hashSync(v, bcryptJS.genSaltSync(10)),
    },
    image: {
    public_id: String,
    url: String,
    
    },
    address: {
      type: String,
      required: [true, "Enter your address"],
    },
    phone: {
      type: String,
      required: [true, "User Address is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
