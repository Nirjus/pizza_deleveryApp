const mongoose = require("mongoose");
const { defaultproductImagePath } = require("../secret");

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, "Product name is required"],
        trim: true,
    },
    description:{
        type: String,
        required:[true, "Product Description is required"],
        minlength: [12, "description should be more than 12 letters"],
        maxlength: [120, "description should not be more than 120 letters"],
    },
    images:{
        type: String,
        default: defaultproductImagePath,
        required: [true, "Product Images is required"],
    },
    category:{
      sauce:{
        type:Array,
        options:["chilli","pudina", "papar","tomato"],
        default: "tomato",
      },
      cheese:{
        type: Array,
        options:["butter","rosted","white","brown"],
        default: "butter",
      },
      base:{
         type: Array,
         options:["5 layer","4 layer", "3 layer"," 2 layer"],
         default: "3 layer",
      },
    },
    price:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        default: "Medium",
        options: ["Small","Medium","Large"],
    },
    stock:{
        type: Number,
        default: false,
    },
    tags:{
        type: String,
        default: false,
    }

},{timestamps: true})

const Product = mongoose.model("Products", productSchema);

module.exports = Product;