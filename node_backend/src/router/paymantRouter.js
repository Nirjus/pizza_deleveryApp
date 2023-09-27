const express = require("express");

const paymentRoute = express.Router();
const {paymentProcess, getApiKey} = require("../controller/payment");
const { isLogIn } = require("../middleware/userAuth");

paymentRoute.post("/process",isLogIn,paymentProcess);
paymentRoute.get("/stripeapikey", getApiKey);

module.exports = paymentRoute