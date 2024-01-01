const pool = require('./conect')
const mysql = require('mysql2');


async function logIn(dataObj) {
        const data = await pool.query(`SELECT username FROM users WHERE username=? JOIN password
         ON users.id=password.userID AND password.password=?`, [dataObj.body.username, dataObj.body.password]);
        if (data.length > 0) {
                return true;
        }
        return false;
}
module.exports = { logIn }