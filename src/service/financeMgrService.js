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
    //console.log("TICKET STATUS: " + ticket.status);
    try{
        if(ticket.status == "Approved" || ticket.status == "Denied") {
            throw new Error ("Ticket cannot be updated" );
        } 
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
    //console.log("TICKET STATUS: " + ticket.status);
    try{
        if(ticket.status == "Approved" || ticket.status == "Denied") {
            throw new Error ("Ticket cannot be updated" );
        }   

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

async function getTicketById(ticket_id){ //get a user by their username
    try{
        if(ticket_id){ //if username exists
            const data = await financeMgrDAO.getTicketById(ticket_id);
            if(data){ //if data exists
                logger.info(`Ticket: ${JSON.stringify(data)} found`);
                return data;
            }else{
                logger.error(`Ticket: ${username} not found`);
                throw new Error ("Ticket is not found");
            }
        }else{
            throw new Error ("Ticket does not exist");
        }
    }catch(err){
        logger.error(err.message);
    }
}

//getTicketById("8b94e2c0-c853-4aae-bb97-25f4f366eb45");

module.exports = {
    getAllPendingTickets,
    approveTicket,
    denyTicket,
    getTicketById
}