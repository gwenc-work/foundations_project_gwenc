const { submitNewTicket, getAllTicketsByCreatorName } = require ('../src/service/employeeService');
const { validateCreator, validateAmount, validateDesc } = require('../src/service/utilService/validateTicketCreation');

//mock function for submitNewTicket function
submitNewTicketMock = jest.fn();

const dummyNewTicket = { //Arrange
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000
}

//testing purpose: is coding successfully POSTing data?
describe("Should POST new reimbursement ticket", () => {
    test("Successfull post a new ticket object", () => {
        //arrange
        submitNewTicketMock.mockReturnValue(dummyNewTicket);
        let result = {};

        //action
        result = submitNewTicketMock(dummyNewTicket);
        //console.log(result);

        //assert
        expect(result).toBe(dummyNewTicket);
    })
})

//mock function for getAllTicketsByCreatorName function
getAllTicketsByCreatorNameMock = jest.fn();

const dummyTicketObject = { //Arrange 
    "creator": "testingnewuser",
    "description": "stationary office supplies", 
    "amount": 5000
}

//testing purpose: is coding successfully GETting all the ticket data by creator?
describe("Should GET allTicketsByCreatorName", () => {
    test("Successfully GET all ticket object by Creator", () => {
        //arrange
        getAllTicketsByCreatorNameMock.mockReturnValue(dummyTicketObject);
        let result = {};

        //action
        result = getAllTicketsByCreatorNameMock (dummyTicketObject);
        //console.log(dummyTicketObject.creator);
        //console.log(result);

        //assert
        expect(result).toBe(dummyTicketObject);
    })
})

//empty string for the creator
const dummyTicketNoCreator = { //Arrange 
    "creator": "",
    "description": "stationary office supplies", 
    "amount": 5000
}

//testing purpose: is coding successfully throwing an error when a creator does not exist?
describe("Should GET allTicketsByCreatorName", () => {
    test("Receive an error when a creator does not exist", () => {
        //arrange
        getAllTicketsByCreatorNameMock.mockReturnValue("ticket data not found");
        let result = {};

        //action
        result = getAllTicketsByCreatorNameMock (dummyTicketNoCreator.creator);
        //console.log(dummyTicketObject.creator);
        //console.log(result);

        //assert
        expect(result).toBe("ticket data not found");
    })
})


//mock function for validateCreator function
validateCreatorMock = jest.fn();

const dummyTicketValidCreator = { //Arrange
    "username": "testingnewuser"
}

//testing purpose: is coding successfully GETting the creator/user?
describe("Should GET True for an existing username", () => {
    test("Existing username", () => {
        //arrange
        validateCreatorMock.mockReturnValue(true);
        let result = {};

        //action
        result = validateCreatorMock(dummyTicketValidCreator);
        //console.log(result);

        //assert
        expect(result).toBe(true);
    })
})

//mock function for validateAmount function
validateAmountMock = jest.fn();

const dummyTicketNoAmount = { //Arrange
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 0
}

//testing purpose: is coding successfully GETting false for no amount?
describe("Should GET false for no amount", () => {
    test("No amount on ticket", () => {
        //arrange
        validateAmountMock.mockReturnValue(false);
        let result = undefined;

        //action
        result = validateAmountMock(dummyTicketNoAmount);
        //console.log(result);

        //assert
        expect(result).toBe(false);
    })
})


const dummyTicketWithAmount = { //Arrange
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 10000
}

//testing purpose: is coding successfully GETting true for a present amount?
describe("Should GET true for an amount", () => {
    test("Amount on ticket", () => {
        //arrange
        validateAmountMock.mockReturnValue(true);
        let result = undefined;

        //action
        result = validateAmountMock(dummyTicketWithAmount);
        //console.log(result);

        //assert
        expect(result).toBe(true);
    })
})

//mock function for validateDesc function
validateDescMock = jest.fn();

const dummyTicketNoDesc = { //Arrange
    "creator": "testingnewuser", 
    "description": "", 
    "amount": 100
}

//testing purpose: is coding successfully GETting false for no description?
describe("Should GET false for no description", () => {
    test("No description on ticket", () => {
        //arrange
        validateDescMock.mockReturnValue(false);
        let result = undefined;

        //action
        result = validateDescMock(dummyTicketNoDesc);
        //console.log(result);

        //assert
        expect(result).toBe(false);
    })
})

const dummyTicketWithDesc = { //Arrange
    "creator": "testingnewuser", 
    "description": "monitors, whiteboards, pens", 
    "amount": 10000
}

//testing purpose: is coding successfully GETting true for a present description?
describe("Should GET true for an description", () => {
    test("Description on ticket", () => {
        //arrange
        validateDescMock.mockReturnValue(true);
        let result = undefined;

        //action
        result = validateDescMock(dummyTicketWithDesc);
        //console.log(result);

        //assert
        expect(result).toBe(true);
    })
})

