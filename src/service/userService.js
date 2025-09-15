const userDAO = require('../repository/userDAO');
const bcrypt = require('bcrypt');
const { logger }  = require("../util/logger");
const { validateFields, validateUniqueUsername } = require ("../service/utilService/validateRegistration");
//const uuid = require('uuid');

async function registerNewUser(user){ //put // call validateRegistration functions 
    const saltRounds = 10;
    if (validateFields(user)){ //check if username and pwd are included'
        console.log("validateFields passed");
        let userNameCheck = await validateUniqueUsername(user.username);
        console.log("usernameCHECK: " + userNameCheck);
        if(!userNameCheck){ //check if username does not //validateUniqueUsername(user.username)
            logger.info(`Failed to register new user`);
        }else{
            console.log("validateUniqueUserName passed");
            console.log("userNameCheck2: " + userNameCheck);
            const password = await bcrypt.hash(user.password, saltRounds);
            const newUserData = await userDAO.registerNewUser({
                user_id: crypto.randomUUID(),
                username: user.username,
                password
            })
            console.log("newUserData: " + newUserData);
            logger.info(`New user ${JSON.stringify(newUserData)} created`);
            return newUserData;
        }
   }
}

//registerNewUser({user_id: null, username:"testService1", password:"testService1Pass"});
//registerNewUser({user_id: null, username:"testDAO1", password:"testService1Pass"});
//registerNewUser({user_id: null, username:"test1", password:"testService1Pass"});

async function validateUserLogin(username, password){
    const userLogin = await getUserByUsername(username);
    if (userLogin && (await bcrypt.compare(password, userLogin.password))){
        logger.info(`User: ${userLogin} is logged in successfully`);
        return userLogin;
    }else{
        logger.info(`User: ${userLogin} had invalid credentials`);
    }
}

async function getUserByUsername (username){
    if(username){ //if username exists
        const data = await userDAO.getUserByUsername(username);
        if(data){ //if data exists
            logger.info(`Username: ${JSON.stringify(data)} found`);
            return data;
        }else{
            logger.info(`Username: ${username} not found`);
        }
    }
}

module.exports = {
    registerNewUser,
    validateUserLogin,
    getUserByUsername
}