const createError = require("http-errors");
const mongoose = require("mongoose");

const findItemById = async (id, Item,options = {}) => {
    try {
        const item = await Item.findById(id, options);

        if (!item) {
          throw createError(404, `${Item.modelName} not found with this id`);
        }
       return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
        throw createError(400, `Invalid ${Item.modelName} Id`);
    }
    throw error;
    }
}

module.exports = {findItemById}
