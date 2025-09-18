const userDAO = require ('../../repository/userDAO');
const bcrypt = require('bcrypt');
const { logger }  = require("../../util/logger");

//must register with username AND password
async function validateFields(user){  //ensure username AND password were entered during registration
    const usernameInput = user.username.length;
    const passwordInput = user.password.length;
    
    if(usernameInput > 0 && passwordInput > 0){
        logger.info("success! username and password are both included in registration");
        //return (user.username && user.password);
        return true;
    }else{
        logger.error("Please input a username AND password during registration");
        return null;
    }
}

//must use username not already registered
async function validateUniqueUsername(username){ //ensure username is not registered
    let userNameData = await userDAO.getUserByUsername(username);
    if(userNameData){ // does the username exist?
        logger.info(`username: ${JSON.stringify(userNameData)} is already taken`);
        logger.error("please register with a different username");
        return false;
    }else{
        logger.info(`username: ${JSON.stringify(username)} is available`);
        return true;
    }
}

module.exports = {
    validateFields,
    validateUniqueUsername
}