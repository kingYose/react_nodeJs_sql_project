const express = require('express')
const app = express();

const { posts_router } = require('./postRoutes')
const { todos_router } = require('./toDosRoutes')
const { user_router } = require('./userRoutes')


app.use('/posts', posts_router)
app.use('/login', user_router)
app.use('/toDos', todos_router)

app.listen(4080, () => { console.log('listening on 4080') })





