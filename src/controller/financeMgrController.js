const express = require('express');
const router = express.Router();

const financeMgrService = require('../service/financeMgrService');

router.post("/Approved", async(req, res) => {
    const ticketData = await financeMgrService.approveTicket(req.body);
    if(ticketData){
        res.status(201).json({message: `Ticket approval successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket approval failed", ticketData: req.body});
    }
})

router.post("/Denied", async(req, res) => {
    const ticketData = await financeMgrService.denyTicket(req.body);
    if(ticketData){
        res.status(201).json({message: `Ticket denial successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket denial failed", ticketData: req.body});
    }
})

// function validateStatus(req, res, next){
//     const ticketData = req.body;
//     if(ticketData){
//         next();
//     }else{
//         res.status(400).json({message: "invalid ticket status", data: ticketData});
//     }

//}


//
router.get("/all-tickets", async (req, res) => {
    //console.log(req.body.get.status)
    const ticketData = await financeMgrService.getAllPendingTickets();
    if(ticketData){
        res.status(200).json({message: `Ticket retrieval successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket retrieval failed", ticketData: req.body});
    }
})

// function validateTickets(req, res, next){
//     const allTicketData = req.body;
//     if(allTicketData){
//         next();
//     }else{
//         res.status(400).json({message: "invalid ticket data", data: allTicketData});
//     }
// }







// append status after ticket endpoint

module.exports = router;