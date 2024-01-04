const express = require('express');
const posts_router = express.Router({ mergeParams: true });
const postFunctions = require('../db/posts')
const commentsFunctions = require('../db/comments');
const { logIn } = require('../db/users')


const valid = async (req, res, next) => {
        try {
                let [username, password] = req.headers.auth.split(':');
                req.body = { ...req.body, username, password }
                const isValid = await logIn(req)
                if (!isValid) {
                        res.status(401).send('Invalid username or password')
                        return
                }
                else {
                        req.user = isValid
                        next();
                }
        } catch (err) {
                console.log(err.message);
        }
}
posts_router.get('/getAll', async (req, res) => {
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
                res.status(500).send()
        }
})
posts_router.get('/get/:postId', valid, async (req, res) => {
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
                res.status(500).send()
        }
})
posts_router.post('/add', valid, async (req, res) => {
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
                res.status(500).send()
        }
})
posts_router.put('/update/:postId', valid, async (req, res) => {
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
                res.status(500).send()
        }
})
posts_router.delete('/delete/:postId', valid, async (req, res) => {
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
                res.status(500).send()
        }
})

posts_router.get('/get/:postId/comments', valid, async (req, res) => {
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
                res.status(500).send()
        }
})
posts_router.post('/:postId/addComment', valid, async (req, res) => {
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
                res.status(500).send()
        }

})
posts_router.delete('/:postId/deleteComment/:id', valid, async (req, res) => {
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
                res.status(500).send()
        }
})

module.exports = { posts_router }