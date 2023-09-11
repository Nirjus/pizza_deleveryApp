const app = require("./app");
const connetcDB = require("./src/config/mongodb");
const { serverPort } = require("./src/secret/secret");


app.listen(serverPort, async () => {
    console.log(`Server is running on : http://localhost:${serverPort}`);
   await connetcDB()
})