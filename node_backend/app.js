const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const {seedRoute} = require("./src/router/seedRouter");
const { userRoute } = require("./src/router/userRoute");
const { errorResponse } = require("./src/controller/responseController");
const { authRoute } = require("./src/router/authRouter");
const { categoryRoter } = require("./src/router/categoryRouter");
const productRoute = require("./src/router/productRouter");
const eventRoute = require("./src/router/eventRouter");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(rateLimiter.rateLimit({
    windowMs: 1*60*1000,
    max: 20,
    message: "Too many request",
}))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.get("/",(req, res) => {
    res.status(201).json({
        message: "Hey , Your backend is running",
    })
})


//   routes
app.use("/api/user", seedRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoter);
app.use("/api/product", productRoute);
app.use("/api/event", eventRoute);
app.use("/api/auth", authRoute);


//   client error
app.use((req, res, next) => {
    
    next(createError(404, "Route not found"));
})

//   server error
app.use((error,req, res, next) => {
   return errorResponse(res, {
    statusCode:error.status,
   message:error.message,
})
})

module.exports = app;