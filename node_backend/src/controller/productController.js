const Product = require("../models/ProductModel");
const createError = require("http-errors");
const cloudinary = require("cloudinary");
const slugify = require("slugify");
const { successResponse } = require("./responseController");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, stock, price, category, image } = req.body;

    const product = await Product.findOne({ name: name });
    if (product) {
      throw createError(404, "This Product is already have");
    }
    // const image = req.file;
   
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "pizzaApp",
    });
    const newProduct = await Product.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      slug: slugify(name),
      category: category,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      payload: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return successResponse(res, {
      statusCode: 200,
      message: "All Products are return successfully",
      payload: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: slug });

    if (!product) {
      throw createError(404, "Product Not Found");
    }
    return successResponse(res, {
      statusCode: 200,
      message: `${product.name} item is return successfully`,
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOneAndDelete({ slug: slug });
    if (!product) {
      throw createError(404, "Product not found");
    }
    await cloudinary.v2.uploader.destroy(product.image.public_id);

    return successResponse(res, {
      statusCode: 200,
      message: `${product.name} item is Deleted successfully`,
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name, description, stock, price, category, image } = req.body;
    // const image = req.file;
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      throw createError(404, "This Product is Not found");
    }
    const updates = {};
    if (name) {
      updates.name = name;
      updates.slug = slugify(name);
    }
    if (description) {
      updates.description = description;
    }
    if (stock) {
      if(stock <= 0){
        throw createError(404, "Stock must be positive Integer");
      }
      updates.stock = stock;
    }
    if (price) {
      if(price <= 0){
        throw createError(404, "Price must be positive Integer");
      }
      updates.price = price;
    }
    if (image) {
      await cloudinary.v2.uploader.destroy(product.image.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "pizzaApp",
      });
      updates.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    if (category) {
      updates.category = category;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      updates,
      { new: true }
    );

    return successResponse(res, {
      statusCode: 201,
      message: `${product.name} this item updated successfully`,
      payload: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
