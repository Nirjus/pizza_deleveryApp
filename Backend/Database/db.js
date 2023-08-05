const mongoose = require("mongoose");
const { Database } = require("../secret");

const MongoDB = () => {

    mongoose.connect(Database,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
  }).then(() => {
    console.log("Database connected Successfully")
  }).catch((error) => {
    console.log("Datbase is not connected", error);
  })
} 

module.exports = MongoDB;