const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  
    name: {
        type: String,
        required:[true, "category name is required"],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required:[true, "category slug is required"],
        lowercase: true,
        unique: true,
    },
    image:{
        public_id: String,
        url: String,
    }
}, {timestamps: true})

const Category = mongoose.model("category", categorySchema);

module.exports = Category