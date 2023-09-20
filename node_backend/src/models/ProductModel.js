const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Product name is required"],
        trim: true,
        unique: true,
        minlength: [10, "Name contain atlist 4 character"],
    },
    description:{
        type: String,
        required: [true, "Product Description is required"],
        trim: true,
    },
    slug: {
        type: String,
        required:[true, "category slug is required"],
        lowercase: true,
        unique: true,
    },
    stock:{
        type: Number,
        required:[true, "Please provide Product Stock"],
        validate:{
            validator:(v) => v > 0,
            message: "Product stock must be positive integer"
        }
    },
    image:{
        public_id: String,
        url: String,
    },
    price:{
        type: Number,
        required:[true, "Product price is necessery field"],
        validate:{
            validator:(v) => v > 0,
            message: "Product price must be positive integer",
        }
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }
},{timestamps: true})

const Product = mongoose.model("products", productSchema);
module.exports = Product