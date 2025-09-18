const express = require('express')
const router = express.Router();

const employeeService = require("../service/employeeService");

router.get("/:creator", async(req, res) => { //creator name passed in
    const ticketData = await employeeService.getAllTicketsByCreatorName(req.params.creator);
    if(ticketData){
        res.status(200).json({message: `Tickets returned successfully ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Tickets returned failed", ticketData: req.body});
    }
})

router.post("/", validatePostUser, async (req, res) => { //post a new ticket
    const ticketData = await employeeService.submitNewTicket(req.body);
    if(ticketData){
        res.status(201).json({message: `Ticket creation successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket creation failed", ticketData: req.body});
    }
})

function validatePostUser(req, res, next){ //valid a user who will create a new ticket
    const userCreator = req.body;
    if(userCreator.creator){
        next();
    }else{
        res.status(400).json({message: "invalid user credentials", data: user});
    }
}

module.exports = router;