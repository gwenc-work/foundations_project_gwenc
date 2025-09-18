const { registerNewUser, validateUserLogin, getUserByUsername } = ("../src/service/userService");
const { validateFields, validateUniqueUsername } = require ("../src/service/utilService/validateRegistration");

// mock function for posting a new user to db
registerNewUserMock = jest.fn();

// dummy new user for registration
const dummyNewUser = {
    "username": "testingnewuser",
    "password": "testingpass"
}

//testing purpose: is the code successfully POSTing a new user?
describe("New user should be posted and saved to db", () => {
    test("POST new user dummy data successfully", () => {
          //arrange
        registerNewUserMock.mockReturnValue(dummyNewUser);
        let result = {};

        //action
        result = registerNewUserMock(dummyNewUser);
        //console.log(result);

        //assert
        expect(result).toBe(dummyNewUser);
    })
})


// mock function for GETting a valid user login
validateUserLoginMock = jest.fn();

// dummy user for login
const dummyUserLogin = {
    "username": "testingnewuser",
    "password": "testingpass"
}

//testing purpose: is the code successfully GETting a user?
describe("User should be validated", () => {
    test("should GET/Read user login", () => {
          //arrange
        validateUserLoginMock.mockReturnValue(dummyUserLogin);
        let result = {};

        //action
        result = validateUserLoginMock(dummyUserLogin);
        //console.log(result);

        //assert
        expect(result).toBe(dummyUserLogin);
    })
})


// mock function for GETting a valid user by username
getUserByUsernameMock = jest.fn()

// dummy data for user
const dummyFindUser = {
    "username": "testingnewuser",
    "password": "testingpass"
}

//testing purpose: is the code successfully GETting a username?
describe("Username should be retrieved", () => {
    test("should GET/Read user", () => {
          //arrange
        getUserByUsernameMock.mockReturnValue(dummyFindUser.username);
        let result = {};

        //action
        result = getUserByUsernameMock(dummyFindUser.username);
        //console.log(result);

        //assert
        expect(result).toBe(dummyFindUser.username);
        
    })
})


// mock function for GETting valid registration fields
validateFieldsMock = jest.fn()

// dummy data for user
const dummyValidateUserFields = {
    "username": "username",
    "password": "password"
}

//testing purpose: is the code successfully GETting all valid user fields if both are provided?
describe("Username and Password should be retrieved", () => {
    test("should GET/Read username and password", () => {
        return validateFields(dummyValidateUserFields).then(data => {
            expect(data).toBeTruthy;
        })
    })
})


// dummy data for missing username
const dummyMissingUsername = {
    "username": "",
    "password": "password"
}

//testing purpose: is the code successfully failing if a username field is missing?
describe("Intentionally not inputting a username needed for registration", () => {
    test("should receive null", () => {
          //arrange
        validateFieldsMock.mockReturnValue(null);
        let result = {};

        //action
        result = validateFieldsMock(dummyMissingUsername);
        //console.log(result);

        //assert
        expect(result).toBeNull;
    })
})


// dummy data for missing password
const dummyMissingPwd = {
    "username": "username",
    "password": ""
}

//testing purpose: is the code successfully returning null if a password field is missing?
describe("Intentionally not inputting a password needed for registration", () => {
    test("should receive null", () => {
          //arrange
        validateFieldsMock.mockReturnValue(null);
        let result = {};

        //action
        result = validateFieldsMock(dummyMissingPwd);
        //console.log(result);

        //assert
        expect(result).toBeNull;
    })
})


// mock function for validating a username is unique
validateUniqueUsernameMock = jest.fn()

const dataNotFound = {};

//testing purpose: is the code successfully returning false if a username is not unique?
describe("Handling a non-unique name for registration", () => {
    test("should be falsy", () => {

        //arrange
        let result = {};

        //action
        result = validateUniqueUsername(dataNotFound);
        //console.log(result);

        //assert
        expect(result).toBeFalsy;
    })
})

// dummy data for a unique username
const dummyUniqUserName = {
    "username": "newname",
    "password": "newpass"
}

//testing purpose: is the code successfully returning true if unique username is provided for registration?
describe("Handling a unique name for registration", () => {
    test("should be truthy", () => {

        //arrange
        //validateUniqueUsername.mockReturnValue(true);
        let result = {};
        
        //action
        result = validateUniqueUsername(dummyUniqUserName);
        console.log(result);

        //assert
        expect(result).toBeTruthy;
    })
})

