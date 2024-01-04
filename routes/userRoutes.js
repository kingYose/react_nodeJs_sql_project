const express = require('express');
const user_router = express.Router();
const userFunctions = require('../db/users');
const e = require('express');


user_router.post('/', async (req, res) => {




        const data = await userFunctions.logIn(req)
        if (!data) {
                res.status(400).send({ message: 'Invalid, please try again' });
                return;
        }

        res.send(data);



})
module.exports = { user_router }



