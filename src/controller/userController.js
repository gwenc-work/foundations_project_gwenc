const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
//const bcrypt = require("bcrypt");

const secretKey = "my-jwt-key";

const userService = require("../service/userService");
//const { authToken } = require("../util/jwt");

router.post("/register", validatePostUser, async (req, res) => { //register/post a new user
    const userData = await userService.registerNewUser(req.body);
    if(userData){
        res.status(201).json({message: `New user registered ${JSON.stringify(userData)}`});
    } else{
        res.status(400).json({message: "user registration failed", userData: req.body});
    }
})

router.post("/login", async (req, res) => { //login authentication as a user
    const { username, password} = req.body;
    const userData = await userService.validateUserLogin(username, password);
    const roleData = await userService.getUserByUsername(username);
    if(userData){
        const token = jwt.sign(
            {
                id: userData.user_id,
                username,
                role: roleData.role
            },
            secretKey,
            {
                expiresIn: "10m"
            }
        );
        // console.log("ROLE:" + roleData.role);
        // console.log("ROLE DATA: "+ roleData.user_id + " " + roleData.username + " " + roleData.role );
        res.status(200).json({message: `${roleData.role} login successful`, token});
        //res.status(200).json({message: "login successful", token});
    }else{
        res.status(400).json({message: "login invalid"});
    }
})

function validatePostUser(req, res, next){ //validate a user exists
    const user = req.body;
    if(user.username && user.password){
        next();
    }else{
        res.status(400).json({message: "invalid user credentials", data: user});
    }
}

module.exports = router;