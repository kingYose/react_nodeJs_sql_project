const express = require('express')
const cors = require('cors');
const app = express();

const { posts_router } = require('./postRoutes')
const { todos_router } = require('./toDosRoutes')
const { user_router } = require('./userRoutes')

app.use(cors());
app.use(express.json())
app.use('/api/users/:userId/posts', (req, res, next) => {
        req.userId = req.params.userId;
        next();
})
app.use('/api/users/:userId/posts', posts_router)

app.use('/login', user_router);

app.use('/api/users/:userId/toDos', (req, res, next) => {
        req.userId = req.params.userId;
        next();
})
app.use('/api/users/:userId/toDos', todos_router)

app.listen(4080, () => { console.log('listening on 4080') })





