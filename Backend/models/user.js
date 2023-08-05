const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultImagePath } = require("../secret");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        minlength:[4, "Your Name is less then 4 character"],
        maxlength:[31, "Your Name is exide the maximum length"],
        trim: true
    },
    password:{
        type: String,
        required:[true, "Please enter your Password"],
        minlength:[6, "Password should be contains atlist 8 unique character"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    email:{
        type: String,
        required:[true, "please enter your email"],
        unique: true,
        trim: true,
        lowercase:true,
        validate:{
            validator: function(v){
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    role:{
        type:String,
        default:"user",
    },
    images:{
        type: String,
        default: defaultImagePath,
    },
    phoneNo:{
        type: Number,
        default: false,
    },
    address:{
        type: String,
        default:false,
    },

}, {timestamps: true})

const User = mongoose.model("Users", userSchema);
module.exports = User;