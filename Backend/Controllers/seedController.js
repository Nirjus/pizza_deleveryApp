const data = require("../data");
const User = require("../models/user");

const SeedController = async (req, res, next) => {
    try {
       await User.deleteMany({});
        const user = await User.insertMany(data);
       return res.status(201).json({
            success: true,
            message:"Seed users are returned",
            user,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {SeedController};