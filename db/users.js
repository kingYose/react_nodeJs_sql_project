const pool = require('./conect')
const mysql = require('mysql2');


async function logIn(req) {
        const data = await pool.query(`SELECT username,userId FROM users JOIN passwords
         ON users.id=passwords.userId AND passwords.password=? WHERE username=? `, [req.body.password, req.body.username]);
        const resulte = JSON.stringify(data[0])
        if (resulte[0].length > 0) {
                return resulte;
        }
        else {
                return false;
        }
}
module.exports = { logIn }