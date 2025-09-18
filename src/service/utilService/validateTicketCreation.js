const employeeDAO = require ('../../repository/employeeDAO');
const userDAO = require ('../../repository/userDAO');
const userService = require ('../userService');
const { logger }  = require("../../util/logger");

async function validateCreator(username){ //ensure a user exists
    let userNameData  = await userService.getUserByUsername(username);
    if(userNameData){ //if username exists
        logger.info(`User is successfully logged and exists`);
        return true;
    } else{
        logger.error(`User does not exist`);
        return false;
    }
}

//validateCreator("newuser"); // pass
//validateCreator("ner2"); // fail 

async function validateAmount (ticket){ //ensure an amount on the ticket is provided
    const amountInput = ticket.amount;
    if (amountInput == 0 || amountInput == "" || amountInput == null){
        logger.error(`No amount found. Please provide an amount`);
        return false;
    }else{
        logger.info(`Amount detected successfully`);
        return true;
    }
}

//validateAmount({ticket_id: "238e4668-5cfe-43cb-a3ea-3bc627af95c5", creator: "newuser", description: "travel", amount: 20 });

async function validateDesc (ticket){ //ensure a description on the ticket is provided
    const descInput = ticket.description;
    if (descInput == 0 || descInput == "" || descInput == null){
        logger.error(`No description found. Please provide a description`);
        return false;
    }else{
        logger.info(`Description detected successfully`);
        return true;
    }
}

//validateDesc({ticket_id: "238e4668-5cfe-43cb-a3ea-3bc627af95c5", creator: "newuser", description: "lunch", amount: 20 });

module.exports = {
    //checkLogin,
    validateCreator,
    validateAmount,
    validateDesc
}