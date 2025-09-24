const express = require('express')
const router = express.Router();
const { logger } = require('../util/logger');
const { authToken } = require('../util/jwt');

const employeeService = require("../service/employeeService");
const userService = require('../service/userService');

router.get("/:creator", async(req, res) => { //creator name passed in
    const ticketData = await employeeService.getAllTicketsByCreatorName(req.params.creator);
    if(ticketData){
        res.status(200).json({message: `Tickets returned successfully ${JSON.stringify(ticketData)}`});
    }else{
        res.status(400).json({message: "Tickets returned failed", ticketData: req.body});
    }
})

router.post("/", authToken, validatePostUser, async (req, res) => { //post a new ticket
    try{
        const username = req.userLogin.username;
        const userData = await userService.getUserByUsername(username);
        //console.log("USER ROLE: " + userData.role);

        if(userData.role !== "Employee"){
            res.status(400).json({message: `Only Employees can create tickets`});
        }

        const ticketData = await employeeService.submitNewTicket(req.body);
        if(ticketData && userData.role == "Employee"){
            res.status(201).json({message: `Ticket creation successful ${JSON.stringify(ticketData)}`});
        }else{
            res.status(400).json({message: "Ticket creation failed", ticketData: req.body});
        }
    }catch(err){
        logger.error(err.message);
        res.status(500).json({ message: "Request unable to be fulfilled"});
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