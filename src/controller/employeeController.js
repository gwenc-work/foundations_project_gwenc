const express = require('express')
const router = express.Router();

const employeeService = require("../service/employeeService");

router.post("/", validatePostUser, async (req, res) => {
    const ticketData = await employeeService.submitNewTicket(req.body);
    if(ticketData){
        res.status(201).json({message: `Ticket creation successful ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Ticket creation failed", ticketData: req.body});
    }
})

function validatePostUser(req, res, next){
    const userCreator = req.body;
    if(userCreator.creator){
        next();
    }else{
        res.status(400).json({message: "invalid user credentials", data: user});
    }
}

module.exports = router;