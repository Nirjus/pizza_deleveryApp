const dotenv = require("dotenv");

dotenv.config({
    path: "./src/secret/.env"
})

const serverPort = process.env.PORT || 6000;

const mongoDB_URL = process.env.MONGO_URI || "mongodb://localhost:27017/shopify2023";

const defaultUserImg = process.env.DEFAULT_USER_IMG

const jwtActivationKey = process.env.JWT_ACTIVATIONKEY || "fdrtg5fd2fbg54545fd83545sdcg8f51";

const jwtAccessKey = process.env.JWT_ACCESS_KEY || "skdjfGF654f54#^%*dgd56464GFH655sds";

const jwtResetPAsswordKey = process.env.JWT_RESET_PASSWORD_KEY || "jhgdsHG%^$&6465354$%#^#%^$^nhgf";

const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "jhgdweqPMIJU^%$46554$%#^#%^$^nhgf";

const smtpUsername = process.env.SMTP_USERNAME || "" ;

const smtpPassword = process.env.SMTP_PASSWORD || "";

const frontendUrl = process.env.FRONTEND_URL;

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

const stripeKey = process.env.STRIPE_API_KEY;

const stripeSecret = process.env.STRIPE_API_SECRET;

 
module.exports = {

    serverPort,
    mongoDB_URL,
    defaultUserImg,
    jwtActivationKey,
    smtpPassword,
    smtpUsername,
    frontendUrl,
    jwtAccessKey,
    jwtResetPAsswordKey,
    jwtRefreshKey,
    cloudinaryApiKey,
    cloudinaryApiSecret,
    cloudinaryName,
    stripeKey,
    stripeSecret,

}