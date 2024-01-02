const express = require('express');
const user_router = express.Router();
const userFunctions = require('../db/users')

user_router.post('/', async (req, res) => {

        try {

                const data = await userFunctions.logIn(req)
                res.send(data);

        }
        catch {
                res.status(500).send({ message: 'Invalid, please try again' });
        }
})
module.exports = { user_router }



