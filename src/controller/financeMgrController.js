const express = require('express');
const router = express.Router();

const financeMgrService = require('../service/financeMgrService');

router.post("/Approved", async(req, res) => { //approve a ticket
    const ticketData = await financeMgrService.approveTicket(req.body);
    if(ticketData){
        res.status(200).json({message: `Ticket approval successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket approval failed", ticketData: req.body});
    }
})

router.post("/Denied", async(req, res) => { //deny a ticket
    const ticketData = await financeMgrService.denyTicket(req.body);
    if(ticketData){
        res.status(200).json({message: `Ticket denial successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket denial failed", ticketData: req.body});
    }
})

router.get("/", async (req, res) => { //get all tickets with a status of pending
    const ticketData = await financeMgrService.getAllPendingTickets();
    console.log(JSON.stringify(ticketData));
    if(ticketData){
        res.status(200).json({message: `Ticket retrieval successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket retrieval failed", ticketData: req.body});
    }
})

module.exports = router;