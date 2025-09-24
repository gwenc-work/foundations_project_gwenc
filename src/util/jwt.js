const jwt = require("jsonwebtoken");
const { logger } = require ("./logger");


const secretKey = "my-jwt-key";

async function authToken(req, res, next){
    const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];
    console.log("Authorization header:", req.headers["authorization"]); //incoming header

    if (!authHeader) {  //header does not exist
        console.log(`Authorization header missing`);
        res.status(400).json({message: "Authorization header missing"})
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

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
    }catch(err){
        logger.error(err.message);
    }
}

module.exports = {
    authToken
}