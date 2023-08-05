const jwt = require("jsonwebtoken");

const createToken = (payload, secretKey, expiresIn) => {
    try {
       const token = jwt.sign(payload, secretKey, {expiresIn});
    return token;
    } catch (error) {
        console.error("Jwt sign In error", error);
        throw error;
    }
}

module.exports = {createToken}