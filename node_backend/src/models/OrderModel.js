const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    cart:{
        type: Array,
        required:true,
    },
    shippingAddress:{
        type:Object,
        required: true,
    },
    user:{
        type: Object,
        required: true,
    },
    totalPrice:{
        type: Number,
        required:true,
    },
    subtotalPrice:{
        type: Number,
        required:true,
    },
    shippingCharge:{
        type: Number,
        required:true,
    },
    status:{
        type:String,
        default: "Processing",
    },
    paymentInfo:{
        id:{
            type:String,
        },
        status:{
            type: String,
        },
        paymentType:{
            type: String,
        },
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    deleveredAt:{
        type: Date,
    },

},{timestamps:true})

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;