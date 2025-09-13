const financeMgrDAO = require ('../repository/financeMgrDAO');
const employeeDAO = require('../repository/employeeDAO');
const { logger } = require("../util/logger")
//const { checkLogin, validateCreator, validateAmount, validateDesc } = require ("../service/utilService/validateTicketCreation");


//get/view all pending tickets
async function getAllPendingTickets(){
    const pendingTicketData = financeMgrDAO.getAllPendingTickets();
    if(pendingTicketData){
        logger.info(`data exists`);
        return pendingTicketData;
    } else{
        logger.info(`data not found`);
    }
}

//getAllPendingTickets("Pending");

//method to approve ticket
async function approveTicket(ticket){ //put command
    if(!ticket){ //if ticket does not exist
        logger.info(`ticket does not exist`)
    }else{ //ticket exists
        logger.info(`ticket exists`)
        const updatedData = await financeMgrDAO.editTicket({
            ticket_id : ticket.ticket_id,
            creator: ticket.creator,
            manager: "admin",
            description: ticket.description,
            amount: ticket.amount,
            status: "Approved"
        })
        logger.info(`ticket updated successfully`);
        return updatedData;
    }
}

//approveTicket({ticket_id: "21b065b9-b6ee-4122-aaec-28ab188fb434", creator: "usertest", description: "RESOURCES2", amount: 2000, manager: "mr.smith", status: "Approved"});

async function denyTicket(ticket){ //put command
    if(!ticket){ //if ticket does not exist
        logger.info(`ticket does not exist`)
    }else{ //ticket exists
        logger.info(`ticket exists`)
        const updatedData = await financeMgrDAO.editTicket({
            ticket_id : ticket.ticket_id,
            creator: ticket.creator,
            manager: "admin",
            description: ticket.description,
            amount: ticket.amount,
            status: "Denied"
        })
        logger.info(`ticket updated successfully`);
        return updatedData;
    }
}

//denyTicket({ticket_id: "21b065b9-b6ee-4122-aaec-28ab188fb434", creator: "usertest", description: "RESOURCES2", amount: 2000});

module.exports = {
    getAllPendingTickets,
    approveTicket,
    denyTicket
}