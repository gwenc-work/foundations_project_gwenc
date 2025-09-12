const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require ("../util/logger");

const client = new DynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets_table";

// ticket_id, creator, manager(not assigned yet), description, amount, status(default to pending)
//submit tickets
async function submitNewTicket(ticket){
    const command = new PutCommand ({
        TableName,
        Item: {
            ticket_id: ticket.ticket_id,
            creator: ticket.creator, //login
            manager: "Not assigned yet", 
            description: ticket.description, 
            amount: ticket.amount, 
            status: "Pending"
        }
    })

    try{
        const ticketData = await documentClient.send(command);
        logger.info(`New ticket created ${JSON.stringify(ticketData)}`);
        return ticketData;

    }catch (error){
        logger.error(error)
    }
}

//registerNewUser({user_id: "133ca64a-ab9e-489d-b328-869712fc42ff", username: "testDAO1", password: "testDAO1"});
submitNewTicket({ticket_id: "ec16ed29-a9ca-4c20-9a4f-cd46520526ac", creator: "usertest", description: "travel", amount: 1500 })


module.exports = {
    submitNewTicket
}