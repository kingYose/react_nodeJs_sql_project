const pool = require('./conect')
const mysql = require('mysql2');

async function getToDos(user) {
        const sql = `SELECT * FROM todos WHERE userId=?`
        const data = await pool.query(sql, [user.userId])
        return data;
}

async function getTrueToDos(user) {
        const sql = `SELECT * FROM todos WHERE completed=?`
        const data = await pool.query(sql, [user.userId, 1])
        return data;
}
async function getFalseToDos(user) {
        const sql = `SELECT * FROM todos WHERE completed=?`
        const data = await pool.query(sql, [user.userId, 0])
        return data;
}

async function addTodo(dataObj) {   //data is an object{data.userId, data.title, data.body}
        const sql = `INSERT INTO todos (userId,title,completed)
        values (?,?,?)`
        const data = await pool.query(sql, [dataObj.body.userId, dataObj.body.title, dataObj.body.completed]);
        console.log(data)
        return data;
}

async function updateTodoTitle(dataObj) {
        const sql = `UPDATE todos SET todos.title=? WHERE todos.id=?`
        const data = await pool.query(
                sql, [dataObj.body.title, dataObj.params.id])

        return data;
}

async function updateTodoComplet(dataObj) {
        const sql = `UPDATE todos SET todos.completed=? WHERE todos.id=? `
        const data = await pool.query(
                sql, [dataObj.body.completed, dataObj.body.todoId])
        console.log([dataObj.body.completed, dataObj.body.todoId].toString());
        return data;
}
async function deleteTodo(dataObj) {
        const sql = `DELETE FROM todos  WHERE id=?`
        const data = await pool.query(sql, [dataObj.params.id])
        return data;

} module.exports = {
        getToDos, deleteTodo, updateTodoComplet, updateTodoTitle, addTodo,
        getFalseToDos, getTrueToDos
}