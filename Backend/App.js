const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const getUsers = require("./Routers/userRoute");
const seedRoute = require("./Routers/seedRoute");
const bodyParser = require("body-parser");
const products = require("./Routers/productRoute");
const adminAction = require("./Routers/AdminRoute");
const app = express();


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req, res, next) => {
    res.status(201).send(
    "<h1>Backend is running Parfectly</h1>"
    )
})
// /api/v2  --> routes
app.use("/api/v2", getUsers);
app.use("/api/v2", seedRoute);
app.use("/api/v2", products);
app.use("/api/v2", adminAction);


//   client user handler
app.use((req, res, next) => {
    next(createError(404, "Route Not Found!"))
})

// server error
app.use((err,req, res, next) => {
     return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
})

module.exports = app;
