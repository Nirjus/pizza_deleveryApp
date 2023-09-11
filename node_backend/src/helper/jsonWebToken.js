const JWT_token = require("jsonwebtoken");


const createJWTToken = (expiresIn, payload, secretKey) => {

    if(typeof payload !== "object" || !payload){
        throw new Error("Payload must be a non-emoty object");
    }

    if(typeof secretKey !== "string" || secretKey === ""){
        throw new Error("secret key must be a non-empty string");
    }

    try {
        const token = JWT_token.sign(payload,secretKey,{expiresIn})

    return token;
    } catch (error) {
        console.error("Failed to sign in JWT :", error);
        throw error;
    }
}

module.exports = {createJWTToken}