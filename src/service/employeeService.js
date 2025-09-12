const employeeDAO = require ('../repository/employeeDAO');
const userDAO = require('../repository/userDAO');
const { logger } = require("../util/logger")
const { checkLogin, validateCreator, validateAmount, validateDesc } = require ("../service/utilService/validateTicketCreation");


//check if creator exists, looking for username in user_table
//check if amount exists
//check if description exists
async function submitNewTicket(ticket){ //put
    // if(checkLogin(ticket.creator)){
    //     if(validateCreator(ticket.creator)){
    //         if(validateAmount(ticket.amount)){
    //             if(validateDesc(ticket.description)){
    //                 const newTicketData = await employeeDAO.submitNewTicket({
    //                     ticket_id: crypto.randomUUID(),
    //                     creator: ticket.creator, //login
    //                     manager: "Not assigned yet", 
    //                     description: ticket.description, 
    //                     amount: ticket.amount, 
    //                     status: "Pending"
    //                 })
    //                 return newTicketData;
    //             } else{
    //                 console.log(`desc not found`);
    //                 logger.info(`Failed to submit a new ticket`);
    //             }
    //         }else{
    //             console.log(`no amount found`);
    //             logger.info(`Failed to submit a new ticket`);
    //         }
    //     }else{
    //         console.log(`creator not found`);
    //         logger.info(`Failed to submit a new ticket`);
    //     }
    // }else{
    //     console.log(`login failed`);
    //     logger.info(`Failed to submit a new ticket`);
    // }

    //console.log("flag: " + ticket.creator)

    //let loginCheck = await checkLogin(ticket.creator);
    let creatorCheck = await validateCreator(ticket.creator);
    let amountCheck = await validateAmount(ticket);
    let descCheck = await validateDesc(ticket);

    // if (!checkLogin){
    //     console.log("login false");
    // }else{
    //     console.log("login passed");
    // }

    if (!creatorCheck){
        console.log("creator false");
    } else{
        console.log("creator passed");
        if(!amountCheck){
            console.log("amount not found");
        }else{
            console.log("amount passed");
            if(!descCheck){
                console.log("desc not found");
            }else{
                console.log("desc passed");
                const newTicketData = await employeeDAO.submitNewTicket({
                    ticket_id: crypto.randomUUID(),
                    creator: ticket.creator, //login
                    manager: "Not assigned yet", 
                    description: ticket.description, 
                    amount: ticket.amount, 
                    status: "Pending"
                })
                return newTicketData;
            }
        }
    }

}

//submitNewTicket({creator: "newuser2", description: "travel", amount: 80});
//submitNewTicket({creator: "newuser", description: "resources", amount: 100 });
//submitNewTicket({ticket_id: "473ed56f-169c-4368-9407-7575a46442e8", creator: "usertest", description: "cert", amount: 50 });

//view past tickets

module.exports = {
    submitNewTicket
}