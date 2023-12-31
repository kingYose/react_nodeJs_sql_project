const pool = require('./conect')
const mysql = require('mysql2');

async function getToDos(user) {
        const sql = `SELECT * FROM todos WHERE userId=?`
        const data = await pool.query(sql, [user.id])
        return data;
}


async function getTrueToDos(user) {
        const sql = `SELECT * FROM todos WHERE completed=?`
        const data = await pool.query(sql, [user.id, 1])
        return data;
}
async function getFalseToDos(user) {
        const sql = `SELECT * FROM todos WHERE completed=?`
        const data = await pool.query(sql, [user.id, 0])
        return data;
}

async function addTodo(dataObj) {   //data is an object{data.userId, data.title, data.body}
        const sql = `INSERT INTO todos (userId,title,completed)
        values (?,?,?)`
        const data = await pool.query(sql, [dataObj.userId, dataObj.title, dataObj.completed]);
        return data;
}

async function updateTodoTitle(dataObj) {
        const sql = `UPDATE todos SET todos.title=? WHERE todos.id=?`
        const data = await pool.query(
                sql, [dataObj.title, dataObj.id])
        console.log(data);
        return data;
}

async function updateTodoComplet(dataObj) {
        const sql = `UPDATE todos SET todos.completed=? WHERE todos.id=?`
        const data = await pool.query(
                sql, [dataObj.completed, dataObj.id])
        console.log(data);
        return data;
}
async function deleteTodo(dataObj) {
        const sql = `DELETE FROM todos  WHERE userId=? AND id=?`
        const data = await pool.query(sql, [dataObj.userId, dataObj.todoId])
        return data;

} module.exports = {
        getToDos, deleteTodo, updateTodoComplet, updateTodoTitle, addTodo,
        getFalseToDos, getTrueToDos
}