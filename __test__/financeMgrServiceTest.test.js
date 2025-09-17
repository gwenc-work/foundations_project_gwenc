const { getAllPendingTickets, approveTicket, denyTicket } = require ("../src/service/financeMgrService");

// mock function for GETting all pending tickets
getAllPendingTicketsMock = jest.fn();

// dummy pending ticket to retrieve
const dummyPendingTicket = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Pending"
}

//testing purpose: is the code successfully GETting all pending tickets?
describe("Pending ticket(s) should be retrieved", () => {
    test("should GET/Read Pending tickets", () => {
          //arrange
        getAllPendingTicketsMock.mockReturnValue(dummyPendingTicket);
        let result = {};

        //action
        result = getAllPendingTicketsMock(dummyPendingTicket);
        //console.log(result);

        //assert
        expect(result).toBe(dummyPendingTicket);
    })
})

//not a pending ticket dummy data
const dummyNoPendingTicket = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Approved"
}

//testing purpose: is the code successfully returning null if there are no pending tickets?
describe("Null should be retrieved if there are no pending tickets", () => {
    test("should GET null when there are no pending tickets", () => {
          //arrange
        getAllPendingTicketsMock.mockReturnValue(null);
        let result = {};

        //action
        result = getAllPendingTicketsMock(dummyNoPendingTicket);
        //console.log(result);

        //assert
        expect(result).toBeNull;
    })
})


// mock function for PUTing an approval on a pending ticket
approveTicketMock = jest.fn();

// dummy pending ticket to retrieve
const dummyTicketApprove = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Approved"
}

const dummyTicketPending = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Pending"
}

//testing purpose: is the code successfully PUTting an approval on a pending ticket?
describe("Ticket should switch to Approved status", () => {
    test("should Put Pending tickets to Approved", () => {
          //arrange
        approveTicketMock.mockReturnValue(dummyTicketApprove);
        let result = {};

        //action
        result = approveTicketMock(dummyTicketPending);
        //console.log(result);

        //assert
        expect(result).toBe(dummyTicketApprove);

    })
})

// mock function for PUTing an denial on a pending ticket
denyTicketMock = jest.fn();

// dummy pending ticket to retrieve
const dummyTicketDeny = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Denied"
}

const dummyTicketPendingTwo = { 
    "creator": "testingnewuser", 
    "description": "stationary office supplies", 
    "amount": 5000,
    "status": "Pending"
}

//testing purpose: is the code successfully PUTting a denial on a pending ticket?
describe("Ticket should switch to Denied status", () => {
    test("should Put Pending tickets to Denied", () => {
          //arrange
        denyTicketMock.mockReturnValue(dummyTicketDeny);
        let result = {};

        //action
        result = denyTicketMock(dummyTicketPendingTwo);
        //console.log(result);

        //assert
        expect(result).toBe(dummyTicketDeny);

    })
})