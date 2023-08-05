const express = require("express");
const {
  getAllProducts,
  getAllProductsById,
  createProduct,
} = require("../Controllers/productController");
const upload = require("../middleware/multer");

const products = express.Router();

products.get("/products", getAllProducts);
products.get("/products/:id", getAllProductsById);
products.post("/new-products", upload.single("images"), createProduct);


module.exports = products;
