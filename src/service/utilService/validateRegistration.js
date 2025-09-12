const userDAO = require ('../../repository/userDAO');
const bcrypt = require('bcrypt');
const { logger }  = require("../../util/logger");

//user_id, username, password, role (default to "employee")

//must use username not already registered
//should register with username AND password

async function validateFields(user){  //username AND password entered during registration
    const usernameInput = user.username.length;
    const passwordInput = user.password.length;

    //console.log()
    
    if(usernameInput > 0 && passwordInput > 0){ //can try "is not null"
        logger.info(" success! username and password are both included in registration");
        return (usernameInput && passwordInput);
    }else{
        logger.info(" Please input a username AND password during registration");
    }
}


async function validateUniqueUsername(username){ //username is not registered //check
    let userNameData = await userDAO.getUserByUsername(username);
    if(userNameData){ // does the username exist?
        logger.info(`username: ${JSON.stringify(userNameData)} is already taken`);
        logger.info("please register with a different username");
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