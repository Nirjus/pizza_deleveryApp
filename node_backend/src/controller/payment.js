const { stripeSecret, frontendUrl, stripeKey } = require("../secret/secret");
const { successResponse } = require("./responseController");
const stripe = require("stripe")(stripeSecret);

const paymentProcess = async (req, res, next) => {
  try {
    const { orderData } = req.body;
    //  console.log(orderData.cartItem);
    const amount = orderData.totalPrice * 100;
  
    const myPayment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      metadata: {
        company: "PizzaApp",
      },
    });
   
    return successResponse(res, {
      statusCode: 201,
      message: "Payment successfull",
      payload: {
        client_secret: myPayment.client_secret,
      },
      
    });
  } catch (error) {
    next(error);
  }
};

const getApiKey = async (req, res, next) => {
  try {

    res.status(200).json({
      stripeApikey: stripeKey,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  paymentProcess,
  getApiKey,
};
