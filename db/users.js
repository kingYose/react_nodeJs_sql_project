const pool = require('./conect')
const mysql = require('mysql2');


async function logIn(req) {
        const data = await pool.query(`SELECT username,userId FROM users JOIN passwords
         ON users.id=passwords.userId AND passwords.password=? WHERE username=? `, [req.body.password, req.body.username]);


        if (data[0].length > 0) {

                let resulte = data[0]
                resulte = {
                        'username': resulte[0].username,
                        'userId': resulte[0].userId
                }
                return resulte;
        }
        else {
                return false;
        }
}
module.exports = { logIn }