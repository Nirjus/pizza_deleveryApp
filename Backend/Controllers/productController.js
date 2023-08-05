const createError = require("http-errors");
const Product = require("../models/product");
const fs = require("fs");

const getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      success: true,
      message: "Products are returned successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProductsById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      createError(404, "Product Not found with this Id");
    }

    res.status(201).json({
      success: true,
      message: "Product is returned successfully",
      product,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid product Id"));
      return;
    }
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, stock, tags } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      tags,
      category,
    });
    res.status(200).json({
      success: true,
      message: "Product create successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getAllProductsById,
  createProduct
};
