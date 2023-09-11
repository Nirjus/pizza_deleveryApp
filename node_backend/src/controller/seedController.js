const { data } = require("../../data");
const User = require("../models/UserModel");

const seedController = async (req, res, next) => {
    try {
        //  first remove replica or duplicate data
        await User.deleteMany({});
        //   then use fresh seeding to create non-redundent data in db
        const user = await User.insertMany(data.user);
        res.status(201).json({
            message: "All user are return",
            users: user,
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    seedController
}