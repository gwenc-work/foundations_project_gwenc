const jwt = require("jsonwebtoken");
const logger = require ("./logger");

const secretKey = "my-jwt-key";

async function authToken(req, res, next){
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(400).json({message: "No access granted"});
    }else{
        const userLogin = await decryptJWT(token);
        if(userLogin){
            req.userLogin = userLogin;
            next();
        }else{
            res.status(400).json({message: "token unable to be decrypted"})
        }
    }
}


async function decryptJWT(token){
    try{
        const userLogin = await jwt.verify(token, secretKey);
        return userLogin;
    }catch(error){
        logger.error(error);
    }
}

module.exports = {
    authToken
}