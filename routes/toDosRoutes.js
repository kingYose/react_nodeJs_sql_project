const express = require('express');
const todos_router = express.Router();
const todos_function = require('../db/toDos')
const { logIn } = require('../db/users')

const valid = async (req, res, next) => {
        try {
                let [username, password, userId] = req.headers.auth.split(':');
                req.body = { ...req.body, username, password, userId }
                const isValid = await logIn(req)
                if (!isValid) {
                        res.status(401).send('Invalid username or password')
                        return
                }
                else {
                        req.user = isValid;
                        next();
                }


        } catch (err) {
                console.log(err.message);
        }
}
todos_router.get('/get', valid, async (req, res) => {
        try {
                const data = await todos_function.getToDos(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data);
                }
        }
        catch {
                res.status(500).send()
        }
})
todos_router.get('/getTrue', valid, async (req, res) => {
        try {
                const data = await todos_function.getTrueToDos(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(500).send()
        }
})
todos_router.get('/getFalse', valid, async (req, res) => {
        try {
                const data = await todos_function.getFalseToDos(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(500).send()
        }


})
todos_router.post('/add', valid, async (req, res) => {
        try {
                if (req.user.userId === parseInt(req.userId)) {
                        const data = await todos_function.addTodo(req)
                        if (data.affectedRows < 1) {
                                res.status(404).send('Not Found')
                        }
                        else {
                                res.send('success')
                        }
                }
                else {
                        res.status(404).send('Not allowed')

                }
        }
        catch {
                res.status(500).send()
        }

})
todos_router.put('/updateTitle/:id', valid, async (req, res) => {
        try {

                if (req.user.userId === parseInt(req.userId)) {
                        const data = await todos_function.updateTodoTitle(req)
                        if (!data) {
                                res.status(404).send('Not Found')
                        }
                        else {
                                res.send(data)
                        }
                }
                else { res.status(404).send('Not allowed') }
        }
        catch {
                res.status(500).send()
        }


})
todos_router.put('/updateComplet/:id', async (req, res) => {
        try {
                console.log(req.user.userId + '' + parseInt(req.userId));

                if (req.user.userId === parseInt(req.userId)) {
                        const data = await todos_function.updateTodoComplet(req)
                        if (!data) {
                                res.status(404).send('Not Found')
                        }
                        else {
                                res.send(data)
                        }
                }
                else { res.status(404).send('Not allowed') }
        }
        catch {
                res.status(500).send()
        }
})
todos_router.delete('/delete/:id', valid, async (req, res) => {
        try {

                if (req.user.userId === parseInt(req.userId)) {

                        const data = await todos_function.deleteTodo(req)

                        if (!data) {
                                res.status(404).send('Not Found')
                        }
                        else {
                                res.send(data)
                        }
                }
                else {

                        res.status(404).send('Not allowed')
                }
        }
        catch {
                res.status(500).send()
        }
})


module.exports = { todos_router }