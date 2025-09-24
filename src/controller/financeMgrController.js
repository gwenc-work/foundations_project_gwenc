const express = require('express');
const router = express.Router();
const { logger } = require('../util/logger');
const { authToken } = require('../util/jwt');

const financeMgrService = require('../service/financeMgrService');
const userService = require('../service/userService');

router.post("/Approved", authToken, async(req, res) => { //approve a ticket
    const username = req.userLogin.username;
    const ticket_id = req.body.ticket_id;
    const userData = await userService.getUserByUsername(username);
    const currentTicket = await financeMgrService.getTicketById(ticket_id);

    try{
        if(userData.role != "Manager"){
            res.status(400).json({message: `Only Managers can approve tickets`});
        }

        if(currentTicket.status != "Pending"){
            res.status(400).json({message: `ticket status cannot be changed`});
        }
       
        const ticketData = await financeMgrService.approveTicket(req.body);

        if(ticketData){
            res.status(200).json({message: `Ticket approval successful ${JSON.stringify(ticketData)}`});
        }else{
            res.status(400).json({message: "Ticket approval failed", ticketData: req.body});
        }
    }catch(err){
        logger.error(err.message);
        res.status(500).json({ message: "Request unable to be fulfilled"});
    }
})

router.post("/Denied", authToken, async(req, res) => { //deny a ticket
    const username = req.userLogin.username;
    const ticket_id = req.body.ticket_id;
    const userData = await userService.getUserByUsername(username);
    const currentTicket = await financeMgrService.getTicketById(ticket_id);
    //console.log("USER ROLE: " + userData.role);
    try{
        if(userData.role != "Manager"){
            res.status(400).json({message: `Only Managers can deny tickets`});
        }

        if(currentTicket.status != "Pending"){
            res.status(400).json({message: `ticket status cannot be changed`});
        }

        const ticketData = await financeMgrService.denyTicket(req.body);

        if(ticketData){
            res.status(200).json({message: `Ticket denial successful ${JSON.stringify(ticketData)}`});
        }else{
            res.status(400).json({message: "Ticket denial failed", ticketData: req.body});
        }
    }catch(err){
        logger.error(err.message);
        res.status(500).json({ message: "Request unable to be fulfilled"});
    }
})

router.get("/Pending", authToken, async (req, res) => { //get all tickets with a status of pending
    const username = req.userLogin.username;
    const userData = await userService.getUserByUsername(username);
    const ticketData = await financeMgrService.getAllPendingTickets();
    //console.log(JSON.stringify(ticketData));
    try{
        if(userData.role !== "Manager"){
            res.status(400).json({message: `Only Managers can see all pending tickets from everyone`});
        }

        if(ticketData){
            res.status(200).json({message: `Pending Ticket retrieval successful ${JSON.stringify(ticketData)}`});
        }else{
            res.status(400).json({message: "Pending Ticket retrieval failed", ticketData: req.body});
        }
    }catch(err){
        logger.error(err.message);
        res.status(500).json({ message: "Request unable to be fulfilled"});
    }
})

module.exports = router;