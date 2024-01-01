const express = require('express');
const todos_router = express.Router();
const todos_function = require('../db/toDos')

todos_router.get('/get', async (req, res) => {

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
                res.status(400).send('bad request')
        }
})
todos_router.get('/getTrue', async (req, res) => {
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
                res.status(400).send('bad request')
        }
})
todos_router.get('/getFalse', async (req, res) => {
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
                res.status(400).send('bad request')
        }


})


todos_router.post('/add', async (req, res) => {
        try {
                const data = await todos_function.addTodo(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(400).send('bad request')
        }

})
todos_router.put('/updateTitle/:id', async (req, res) => {
        try {
                const data = await todos_function.updateTodoTitle(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(400).send('bad request')
        }


})
todos_router.put('/updateComplet/:id', async (req, res) => {
        try {
                const data = await todos_function.updateTodoComplet(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(400).send('bad request')
        }
})
todos_router.delete('/delete/:id', async (req, res) => {
        try {
                const data = await todos_function.deleteTodo(req)
                if (!data) {
                        res.status(404).send('Not Found')
                }
                else {
                        res.send(data)
                }
        }
        catch {
                res.status(400).send('bad request')
        }
})


module.exports = { todos_router }