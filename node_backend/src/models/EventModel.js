const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Event name is required"],
        trim: true,
        unique: true,
        minlength: [10, "name contain atlist 4 character"],
    },
    description:{
        type: String,
        required: [true, "Event Description is required"],
        trim: true,
    },
   
    stock:{
        type: Number,
        required:[true, "Please provide Event Stock"],
        validate:{
            validator:(v) => v > 0,
            message: "Event stock must be positive integer"
        }
    },
   
    price:{
        type: Number,
        required:[true, "Event price is necessery field"],
        validate:{
            validator:(v) => v > 0,
            message: "Event price must be positive integer",
        }
    },
    slug: {
        type: String,
        required:[true, "Event slug is required"],
        lowercase: true,
        unique: true,
    },
   
},{timestamps: true})

const Event = mongoose.model("events", EventSchema);
module.exports = Event