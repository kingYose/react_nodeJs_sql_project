const express = require('express');
const user_router = express.Router();
const userFunctions = require('../db/users')

user_router.get('/', async (req, res) => {
        const data = await userFunctions.logIn()
        res.send(data);
})
module.exports = { user_router }



