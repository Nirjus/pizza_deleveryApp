const express = require("express");
const { isLogIn, isAdmin } = require("../middleware/userAuth");
const { createProduct, getAllProducts, deleteProduct, getSingleProduct, updateProduct } = require("../controller/productController");

const productRoute = express.Router();

productRoute.post("/create",isLogIn, isAdmin, createProduct);
productRoute.get("/", getAllProducts);
productRoute.get("/admin",isLogIn,isAdmin, getAllProducts);
productRoute.get("/:slug", getSingleProduct);
productRoute.delete("/delete/:slug",isLogIn,isAdmin, deleteProduct);
productRoute.put("/update/:slug",isLogIn,isAdmin, updateProduct);

module.exports = productRoute;
