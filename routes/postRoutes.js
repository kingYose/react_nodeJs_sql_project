const express = require('express');
const posts_router = express.Router({ mergeParams: true });
const postFunctions = require('../db/posts')
const commentsFunctions = require('../db/comments');

posts_router.get('/getAll', async (req, res) => {
        console.log(req.myParams);
        try {
                const data = await postFunctions.getAllPosts()
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
posts_router.get('/get/:postId', async (req, res) => {
        try {
                const data = await postFunctions.getPost(req)
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
posts_router.post('/add', async (req, res) => {
        try {
                const data = await postFunctions.addPost(req)
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
posts_router.put('/update/:postId', async (req, res) => {
        try {
                const data = await postFunctions.updatePosts(req)
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
posts_router.delete('/delete/:postId', async (req, res) => {
        try {
                const data = await postFunctions.deletePosts(req)
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

posts_router.get('/get/:postId/comments', async (req, res) => {
        try {
                const data = await commentsFunctions.getComments(req.params.postId)
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
posts_router.post('/get/:postId/addComment', async (req, res) => {
        try {
                const data = await commentsFunctions.addComment(req)
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
posts_router.delete('/get/:postId/delete/:id', async (req, res) => {
        try {
                const data = await commentsFunctions.deleteComment(req)
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

module.exports = { posts_router }