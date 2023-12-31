const pool = require('./conect')
const mysql = require('mysql2');


async function logIn(dataObj) {
        const data = await pool.query(`SELECT username FROM users WHERE username=? JOIN password
         ON users.id=password.userID AND password.password=?`, [dataObj.username, dataObj.password]);
        if (data.length > 1) {
                return true, data
        }
        return false
}
module.exports = { logIn }