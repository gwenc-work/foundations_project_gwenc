const financeMgrDAO = require ('../repository/financeMgrDAO');
const employeeDAO = require('../repository/employeeDAO');
const { logger } = require("../util/logger")

async function getAllPendingTickets(){ //get/view all pending tickets
    const pendingTicketData = await financeMgrDAO.getAllPendingTickets();
    try{
        if(pendingTicketData){
            logger.info(`data exists`);
            //console.log(pendingTicketData);
            return pendingTicketData;
        }else{
            throw new Error ("data not found");
        }
    }catch(err){
        logger.error(err.message);
    }
}

//getAllPendingTickets();

async function approveTicket(ticket){//method to change ticket status to approved
    try{
        if(!ticket){ //if ticket does not exist
            throw new Error ("ticket does not exist");
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
    }catch(err){
        logger.error(err.message);
    }
}

//approveTicket({ticket_id: "21b065b9-b6ee-4122-aaec-28ab188fb434", creator: "usertest", description: "RESOURCES2", amount: 2000, manager: "mr.smith", status: "Approved"});

async function denyTicket(ticket){ //method to change ticket status to denied
    try{
        if(!ticket){ //if ticket does not exist
            throw new Error ("ticket does not exist");
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
    }catch(err){
        logger.error(err.message);
    }
}

//denyTicket({ticket_id: "21b065b9-b6ee-4122-aaec-28ab188fb434", creator: "usertest", description: "RESOURCES2", amount: 2000});

module.exports = {
    getAllPendingTickets,
    approveTicket,
    denyTicket
}