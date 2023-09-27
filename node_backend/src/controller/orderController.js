const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const { successResponse } = require("./responseController");
const createError = require("http-errors");

const createOrder = async( req, res, next) => {

    try {
          const {cart,shippingAddress,user,totalPrice,subtotalPrice,shippingCharge,paymentInfo} = req.body;

          const order = await Order.create({
            cart:cart,
            user:user,
            shippingAddress:shippingAddress,
            shippingCharge:shippingCharge,
            totalPrice:totalPrice,
            subtotalPrice:subtotalPrice,
            paymentInfo:paymentInfo,
          });
          if(!order){
            throw createError("Order not plased successfully!");
          }
        return successResponse(res, {
            statusCode:201,
            message:"Order created successfully",
            payload: order,
        })
    } catch (error) {
        next(error);
    }
}

const getAllOrders = async( req, res, next) => {

    try {
         const id = req.user._id;
        const orders = await Order.find({
          "user._id": id,
        }).sort({
            createdAt: -1
        })
        if(!orders){
            throw createError(404, "Orders are Not found!");
        }
        return successResponse(res, {
            statusCode:200,
            message:"All Orders are return Successfully",
            payload: {
                orders
            },
        })
    } catch (error) {
        next(error);
    }
}

const getAllOrdersForAdmin = async( req, res, next) => {

    try {

        const orders = await Order.find({}).sort({
            createdAt: -1
        })
        if(!orders){
            throw createError(404, "Orders are Not found!");
        }
        return successResponse(res, {
            statusCode:200,
            message:"All Orders are return Successfully",
            payload: {
                orders
            },
        })
    } catch (error) {
        next(error);
    }
}

const getSingleOrders = async( req, res, next) => {

    try {
       const id = req.params.id;
        const order = await Order.findById(id);
        if(!order){
            throw createError(404, "Order Not found with this Id!");
        }

        return successResponse(res, {
            statusCode:200,
            message:"order return successfuly",
            payload:{
                order
            }
        })
    } catch (error) {
        next(error);
    }
}


const updateOrder = async( req, res, next) => {

    try {
           const id = req.params.id;

           const update = {
            status:"Delevered",
           }
           const updatedOrder = await Order.findByIdAndUpdate({_id:id},update,{new:true});

           if(updatedOrder.status === "Delevered"){
              updatedOrder.paymentInfo.status = "Succeeded";
              updatedOrder.cart.forEach(async (o) => {
                await updatesOrder(o._id, o.qty);
              })
           }
           await updatedOrder.save({ validateBeforeSave: false });

           async function updatesOrder(id, qty) {
            const product = await Product.findById(id);
    
            product.stock -= qty;
    
            await product.save({ validateBeforeSave: false });
          }

        return successResponse(res, {
            statusCode:200,
            message:"Order Status updated",
            payload:{
                updatedOrder
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getAllOrdersForAdmin,
    getSingleOrders,
    updateOrder,
}