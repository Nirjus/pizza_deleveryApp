const slugify = require("slugify");
const { successResponse } = require("./responseController");
const cloudinary = require("cloudinary");
const createError = require("http-errors");
const Category = require("../models/CategoryModel");

const createCategory = async (req, res, next) => {
  try {
    const { name,image } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(image,{
        folder: "pizzaApp",
    })
    const categoryName = await Category.findOne({ name:name });

    if (categoryName) {
      throw createError(404, "This category already have");
    }
    const newCategory = {
      name: name,
      slug: slugify(name),
      image:{
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    };
    const category = await Category.create(newCategory);

    return successResponse(res, {
      statusCode: 201,
      message: "Category created successfully",
      payload: { category },
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find({});
    if(!allCategory){
        throw new Error("No category found!");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Categories are returned successfully",
      payload: allCategory,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleCategory = async (req, res, next) => {
    try {
        const {slug} = req.params;
      const category = await Category.findOne({slug:slug});
      if(!category){
        throw createError(404, "this category is not exists!");
      }
      return successResponse(res, {
        statusCode: 200,
        message: `${category.name} categorie is returned successfully`,
        payload: category,
      });
    } catch (error) {
      next(error);
    }
  };
const deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const deleteOne = await Category.findOneAndDelete({slug:slug});
    
    await cloudinary.v2.uploader.destroy(deleteOne.image.public_id);

    if (!deleteOne) {
      throw createError(404, "Category not deleted!");
    }
    return successResponse(res, {
      statusCode: 200,
      message: `${deleteOne.name} categorie is deleted successfully`,
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { oldName, newName,image } = req.body;
     const updates = {};
    const category = await Category.findOne({name: oldName});

   if(newName){
    updates.name = newName;
    updates.slug = slugify(newName);
   }
    if(image){
        await cloudinary.v2.uploader.destroy(category.image.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"pizzaApp"
        })
        updates.image = {
            public_id: myCloud.public_id,
            url: myCloud.url,
        }
    }
    const updateCategory = await Category.findOneAndUpdate(
      { name: oldName },
      updates,
      { new:true }
    );
    
    if (!updateCategory) {
      throw createError(404, "This category is not exists");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Category is updated successfully",
      payload: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createCategory,
  getSingleCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
