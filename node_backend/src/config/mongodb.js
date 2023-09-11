const mongoose = require("mongoose");
const { mongoDB_URL } = require("../secret/secret");

 const connetcDB = async () => {
    try {
       await mongoose.connect(mongoDB_URL);
        console.log(`datbase is connect: ${mongoose.connection.host}`);

        mongoose.connection.on("error", (error) => {
        console.error(error);
        })
    } catch (error) {
        console.error(error.toString());
        
    }
}

module.exports = connetcDB;