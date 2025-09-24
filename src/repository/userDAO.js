const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require ("../util/logger");

const client = new DynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "user_table";

//user_id, username, password, role
//must use username not already registered
//should register with username AND password
async function registerNewUser(user){ //register a new user
    console.log("in userDAO.registerNewUser");
    const command = new PutCommand ({
        TableName,
        Item: user
    })

    try{
        //console.log("TRY FLAG");
        const registrationData = await documentClient.send(command);
        console.log("regisData: " + registrationData);
        logger.info(`Successful put command to db ${JSON.stringify(registrationData)}`);
        return registrationData;

    }catch (error){
        //console.log("CATCH FLAG");
        logger.error(error);
    }
}

//registerNewUser({user_id: "133ca64a-ab9e-489d-b328-869712fc42ff", username: "testDAO1", password: "testDAO1", role: "employee"});

async function getUserByUsername(username){ //get a user by their username
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#username = :username",
        ExpressionAttributeNames: {"#username": "username"},
        ExpressionAttributeValues: {":username": username}
    });

    try{
        const userData = await documentClient.send(command);
        //logger.info(`SCAN command to database complete ${JSON.stringify(data)}`);
        logger.info (`Successful scan command to db ${JSON.stringify(userData)}`)
        return userData.Items[0];
    }catch(error){
        logger.error(error);
        return null;
    }
}

//getUserByUsername("admin1");
//getUserByUsername("testDAO1");

module.exports = {
    registerNewUser,
    getUserByUsername
}