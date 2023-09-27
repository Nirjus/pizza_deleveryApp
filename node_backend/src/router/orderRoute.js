const express = require("express");
const { isLogIn, isAdmin } = require("../middleware/userAuth");
const { createOrder, getAllOrders, getSingleOrders, deleteOrder, updateOrder } = require("../controller/orderController");


const orderRoute = express.Router();

orderRoute.post("/create", createOrder);
orderRoute.get("/", isLogIn,getAllOrders);
orderRoute.get("/admin",isLogIn,isAdmin, getAllOrders);
orderRoute.get("/:id", isLogIn,getSingleOrders);
orderRoute.put("/update/:id",isLogIn,isAdmin, updateOrder);

module.exports = orderRoute;
