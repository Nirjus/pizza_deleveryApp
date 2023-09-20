const Event = require("../models/EventModel");
const createError = require("http-errors");
const cloudinary = require("cloudinary");
const slugify = require("slugify");
const { successResponse } = require("./responseController");

const createEvent = async (req, res, next) => {
  try {
    const { name, description, stock, price, image } = req.body;

    const event = await Event.findOne({ name: name });
    if (event) {
      throw createError(404, "This Event is already have");
    }
    // const image = req.file;
    if (!image) {
      throw createError(404, "Image file is required");
    }
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "pizzaApp",
    });
    const newEvent = await Event.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      slug: slugify(name),
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Event created successfully",
      payload: newEvent,
    });
  } catch (error) {
    next(error);
  }
};
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    return successResponse(res, {
      statusCode: 200,
      message: "All Events are return successfully",
      payload: {
        events,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getSingleEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug: slug });

    if (!event) {
      throw createError(404, "Event Not Found");
    }
    return successResponse(res, {
      statusCode: 200,
      message: `${event.name} item is return successfully`,
      payload: event,
    });
  } catch (error) {
    next(error);
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOneAndDelete({ slug: slug });
    if (!event) {
      throw createError(404, "Event not found");
    }
    await cloudinary.v2.uploader.destroy(event.image.public_id);

    return successResponse(res, {
      statusCode: 200,
      message: `${event.name} item is Deleted successfully`,
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    createEvent,
  getSingleEvent,
  getAllEvents,
  deleteEvent,
};
