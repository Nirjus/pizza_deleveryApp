const app = require("./App");
const MongoDB = require("./Database/db");
const { PORT } = require("./secret");

const connectDB = MongoDB;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
})
