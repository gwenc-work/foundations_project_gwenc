const express = require('express');
const app = express();
const { logger } = require('./src/util/logger');
const { authToken } = require('./src/util/jwt');

const userController = require('./src/controller/userController');

const PORT = 3000;

app.use(express.json());
//app.use(loggerMiddleware) // can create a similar function 

app.use("/users", userController);
app.get("/protected", authToken, (req, res) => {
    res.json({message: "Protected Route Accessed", user: req.userLogin});
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})