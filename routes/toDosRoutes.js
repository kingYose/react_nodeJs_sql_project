const express = require('express');
const todos_router = express.Router();
const todos_function = require('../db/toDos')

todos_router.get('/get', async (req, res) => {
        const data = await todos_function.getToDos(req)
        res.send(data)
})
todos_router.get('/getTrue', async (req, res) => {
        const data = await todos_function.getTrueToDos(req)
        res.send(data)
})
todos_router.get('/getFalse', async (req, res) => {
        const data = await todos_function.getFalseToDos(req)
        res.send(data)
})
todos_router.post('/add', async (req, res) => {
        const data = await todos_function.addTodo(req)
        res.send(data)
})
todos_router.put('/updateTitle', async (req, res) => {
        const data = await todos_function.updateTodoTitle(req)
        res.send(data)
})
todos_router.put('/updateComplet', async (req, res) => {
        const data = await todos_function.updateTodoComplet(req)
        res.send(data)
})
todos_router.delete('/updateComplet', async (req, res) => {
        const data = await todos_function.deleteTodo(req)
        res.send(data)
})


module.exports = { todos_router }