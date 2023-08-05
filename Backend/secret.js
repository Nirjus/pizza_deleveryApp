require("dotenv").config({
  path: "config/.env",
});

const PORT = process.env.SERVER_PORT || 5000;

const Database = process.env.DB_URL;

const defaultImagePath =
  process.env.DEFAULTIAMGEPATH || "public/images/users/4532503.png";

const defaultAdminImagePath =
  process.env.DEFAULTIAMGEPATH || "public/images/users/5556468.png";

const defaultproductImagePath =
  process.env.DEFAULTIAMGEPATH || "public/images/product/pizza.png";

const JWTSecretKey = process.env.JWT_SECRETKEY || "dfgd2f54g6d5fg456d4fg54d";

const SMTPPassword = process.env.SMTP_PASSWORD || "";

const SMTPUserName = process.env.SMTP_USERNAME || "";

module.exports = {
  PORT,
  Database,
  defaultImagePath,
  JWTSecretKey,
  SMTPPassword,
  SMTPUserName,
  defaultproductImagePath,
  defaultAdminImagePath
};
