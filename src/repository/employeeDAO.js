const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require ("../util/logger");

const client = newDynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocument.from(client);

const TableName = "user_table";

//user_id, username, password, role (default to "employee")
//must use username not already registered
//should register with username AND password

//register

async function registerNewEmp(employee){
    const command = new PutCommand ({
        TableName,
        Item: employee
    })

    try{
        const registrationData = await documentClient.send(command);
        logger.info(`Successful registration to db ${JSON.stringify(registrationData)}`);
        return registrationData;

    }catch (error){
        logger.error(error)
    }
}

module.exports = {
    registerNewEmp
}