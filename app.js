const express = require('express');
const app = express();
const { logger } = require('./src/util/logger');
const { authToken } = require('./src/util/jwt');

const userController = require('./src/controller/userController');
const employeeController = require('./src/controller/employeeController');
const financeMgrController = require('./src/controller/financeMgrController');

const PORT = 3000;

app.use(express.json());
//app.use(loggerMiddleware) // can create a similar function 

app.use("/users", userController);
app.get("/protected", authToken, (req, res) => {
    res.json({message: "Protected Route Accessed", user: req.userLogin});
})

app.use("/tickets", employeeController);

app.use("/tickets", financeMgrController);


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})