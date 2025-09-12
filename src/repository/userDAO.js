const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require ("../util/logger");

const client = new DynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "user_table";

//user_id, username, password, role (default to "employee")
//must use username not already registered
//should register with username AND password

async function registerNewUser(user){
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

//registerNewUser({user_id: "133ca64a-ab9e-489d-b328-869712fc42ff", username: "testDAO1", password: "testDAO1"});

// async function getUserByUsername (username){  //userDAO.getUserByUsername(username)
//     console.log("in userDAO.getUserByUserName");
//     console.log("username: " + username);
//     const command = new ScanCommand ({ 
//         TableName,
//         FilterExpression: "#username = :username", //# for attr : for value
//         ExpressionAttributeNames: {"#username": "username"}, //placeholder for username attribute
//         ExpressionAtrributeValues: {":username" : username} //value for username attribute
//     });

//     try{
//         console.log("in try block");
//         const userData = await documentClient.send(command);
//         console.log("userData: " + userData);
//         logger.info (`Successful scan command to db ${JSON.stringify(userData)}`)
//         console.log("userData.Item[0] " + userData.Items[0]);
//         return userData.Items[0]; //might have to be 0 or 1

//     }catch(error){
//         console.log("in catch block");
//         logger.error(error);
//     }
// }

async function getUserByUsername(username){
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

//getUserByUsername("test1");
//getUserByUsername("testDAO1");

module.exports = {
    registerNewUser,
    getUserByUsername
}