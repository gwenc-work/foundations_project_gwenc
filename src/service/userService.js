const userDAO = require('../repository/userDAO');
const bcrypt = require('bcrypt');
const { logger }  = require("../util/logger");
const { validateFields, validateUniqueUsername } = require ("../service/utilService/validateRegistration");
//const uuid = require('uuid');

//Post a new user
async function registerNewUser(user){ //put // call validateRegistration functions 
    const saltRounds = 10;
    try{
        if (validateFields(user)){ //check if username and pwd are included'
            //console.log("validateFields passed");
            let userNameCheck = await validateUniqueUsername(user.username);
            //console.log("usernameCHECK: " + userNameCheck);
            if(!userNameCheck){ //check if username does not //validateUniqueUsername(user.username)
                logger.error(`Failed to register new user`);
                throw new Error ("Username Already Exists");
            }else{
                // console.log("validateUniqueUserName passed");
                // console.log("userNameCheck2: " + userNameCheck);
                const password = await bcrypt.hash(user.password, saltRounds);
                const newUserData = await userDAO.registerNewUser({
                    user_id: crypto.randomUUID(),
                    username: user.username,
                    password,
                    role: "Employee" //default a user registration to "Employee"  //user.role (used to create admin)
                })
                // console.log("newUserData: " + newUserData);
                logger.info(`New user ${JSON.stringify(newUserData)} created`);
                return newUserData;
            }
        }else{
            throw new Error("Username or Password is missing");
        }
   }catch (err) {
        logger.error(err.message);
   }
   
}

//registerNewUser({user_id: null, username:"testService1", password:"testService1Pass", role: null});
//registerNewUser({user_id: null, username:"testDAO1", password:"testService1Pass"});
//registerNewUser({user_id: null, username:"test1", password:"testService1Pass"});

//creating admin
// registerNewUser({user_id: null, username:"admin2", password:"admin2Pass", role: "Manager"});
// registerNewUser({user_id: null, username:"admin3", password:"admin3Pass", role: "Manager"});
// registerNewUser({user_id: null, username:"admin4", password:"admin4Pass", role: "Manager"});

async function validateUserLogin(username, password){ //validate a user attempting to login
    const userLogin = await getUserByUsername(username);
    try{
        if (userLogin && (await bcrypt.compare(password, userLogin.password))){
            logger.info(`User: ${userLogin} is logged in successfully`);
            return userLogin;
        }else{
            logger.info(`User: ${userLogin} had invalid credentials`);
            throw new Error ("User had invalid credentials");
        }
    }catch (err) {
        logger.error(err.message);
    }
}

async function getUserByUsername (username){ //get a user by their username
    try{
        if(username){ //if username exists
            const data = await userDAO.getUserByUsername(username);
            if(data){ //if data exists
                logger.info(`Username: ${JSON.stringify(data)} found`);
                return data;
            }else{
                logger.error(`Username: ${username} not found`);
                throw new Error ("Username is not found");
            }
        }else{
            throw new Error ("Username does not exist");
        }
    }catch(err){
        logger.error(err.message);
    }
}

module.exports = {
    registerNewUser,
    validateUserLogin,
    getUserByUsername
}