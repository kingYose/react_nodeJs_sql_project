const express = require('express');
const posts_router = express.Router();
const postFunctions = require('../db/posts')

posts_router.get('/getAll', async (req, res) => {
        const data = await postFunctions.getAllPosts()
        res.send(data)
})
posts_router.get('/get', async (req, res) => {
        const data = await postFunctions.getPost(req)
        res.send(data)
})
posts_router.post('/add', async (req, res) => {
        const data = await postFunctions.addPost(req)
        res.send(data)
})
posts_router.put('/update', async (req, res) => {
        const data = await postFunctions.updatePosts(req)
        res.send(data)
})
posts_router.delete('/delete', async (req, res) => {
        const data = await postFunctions.deletePosts(req)
        res.send(data)
})

module.exports = { posts_router }