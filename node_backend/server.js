const app = require("./app");
const connetcDB = require("./src/config/mongodb");
const { serverPort, cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = require("./src/secret/secret");
const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
})

app.listen(serverPort, async () => {
    console.log(`Server is running on : http://localhost:${serverPort}`);
   await connetcDB()
})