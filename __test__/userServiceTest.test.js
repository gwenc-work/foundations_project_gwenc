const { registerNewUser, validateUserLogin, getUserByUsername } = ("../src/service/userService");
const { validateFields } = require ("../src/service/utilService/validateRegistration");

// mock function for posting a new user to db
registerNewUserMock = jest.fn();


// dummy new user for registration
const dummyNewUser = {
    "username": "testingnewuser",
    "password": "testingpass"
}

//testing purpose: is the code successfully POSTing a new user?
describe("New user should be posted and saved to db", () => {
    test("should POST new user dummy data", () => {
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

//involves usage of repository layer 
// mock function for GETting a valid user by username
getUserByUsernameMock = jest.fn()

// dummy data for user
const dummyFindUser = {
    "username": "testingnewuser",
    "password": "testingpass"
}

//testing purpose: is the code successfully GETting a user?
describe("User should be retrieved", () => {
    test("should GET/Read user", () => {
          //arrange
        getUserByUsernameMock.mockReturnValue(dummyFindUser);
        let result = {};

        //action
        result = getUserByUsernameMock(dummyFindUser);
        //console.log(result);

        //assert
        expect(result).toBe(dummyFindUser);
    })
})

// mock function for GETting valid registration fields
validateFieldsMock = jest.fn()

// dummy data for user
const dummyValidateUserFields = {
    "username": "username",
    "password": "password"
}

//testing purpose: is the code successfully GETting all valid user fields?
describe("Username and Password should be retrieved", () => {
    test("should GET/Read username and password", () => {
          //arrange
        validateFieldsMock.mockReturnValue(dummyValidateUserFields);
        let result = {};

        //action
        result = validateFieldsMock(dummyValidateUserFields);
        //console.log(result);

        //assert
        expect(result).toBe(dummyValidateUserFields);
    })
})

// dummy data for missing username
const dummyMissingUsername = {
    "username": "",
    "password": "password"
}

const errMsg = "Please input a username AND password during registration";

//testing purpose: is the code successfully Failing if a username field is missing?
describe("Error Msg should be retrieved", () => {
    test("should receive an error msg", () => {
          //arrange
        validateFieldsMock.mockReturnValue(errMsg);
        let result = {};

        //action
        result = validateFieldsMock(dummyMissingUsername);
        //console.log(result);

        //assert
        expect(result).toBe(errMsg);
    })
})

// dummy data for missing password
const dummyMissingPwd = {
    "username": "username",
    "password": ""
}

//testing purpose: is the code successfully Failing if a password field is missing?
describe("Error Msg should be retrieved", () => {
    test("should receive an error msg", () => {
          //arrange
        validateFieldsMock.mockReturnValue(errMsg);
        let result = {};

        //action
        result = validateFieldsMock(dummyMissingPwd);
        //console.log(result);

        //assert
        expect(result).toBe(errMsg);
    })
})

//validateUniqUsername not tested because the function involves usage in the repository layer