const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require ("../util/logger");

const client = new DynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets_table";

async function getAllPendingTickets(){ //get all tickets with a status of pending
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#status = :status",
        ExpressionAttributeNames: {"#status": "status"},
        ExpressionAttributeValues: {":status": "Pending"}
    });

    try{
        const ticketData = await documentClient.send(command);
        logger.info(`SCAN command to database complete ${JSON.stringify(ticketData)}`);
        return ticketData.Items;
    }catch(error){
        logger.error(error);
        return null;
    }
}

//getAllPendingTickets();

async function editTicket(ticket){ //edit a ticket
    const command = new PutCommand({
        TableName,
        Item: ticket
    })

    try{
        const newData = documentClient.send(command);
        logger.info(`New data posted to ticket: ${newData}`);
        return newData;
    }catch(error){
        logger.error(error);
    }

}

//editTicket({ticket_id: "21b065b9-b6ee-4122-aaec-28ab188fb434", creator: "usertest", description: "RESOURCES2", amount: 2000, manager: "mr.smith", status: "Approved"});

module.exports = {
    getAllPendingTickets,
    editTicket
}