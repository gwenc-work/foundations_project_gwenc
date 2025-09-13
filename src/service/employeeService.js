const employeeDAO = require ('../repository/employeeDAO');
const userDAO = require('../repository/userDAO');
const { logger } = require("../util/logger")
const { checkLogin, validateCreator, validateAmount, validateDesc } = require ("../service/utilService/validateTicketCreation");


//check if creator exists, looking for username in user_table
//check if amount exists
//check if description exists
async function submitNewTicket(ticket){ //put
    let creatorCheck = await validateCreator(ticket.creator);
    let amountCheck = await validateAmount(ticket);
    let descCheck = await validateDesc(ticket);

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
async function getAllTicketsByCreatorName(creator){
    const ticketData = employeeDAO.getAllTicketsByCreatorName(creator);
    if(ticketData){
        logger.info(`ticket data exists`);
        return ticketData;
    }else{
        logger.info(`ticket data not found`);
    }

}

//getAllTicketsByCreatorName("usertest");

module.exports = {
    submitNewTicket, 
    getAllTicketsByCreatorName
}