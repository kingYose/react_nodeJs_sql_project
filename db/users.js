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
async function getExistUser(user) {
        const sql = `SELECT * FROM users JOIN passwords ON users.id=passwords.userId WHERE username=? AND passwords.password=?`
        const data = await pool.query(sql, [user.username, user.password]);
        let resulte = data[0]
        const valid = resulte[0].name.length > 1 ? true : false;
        console.log(valid);
        return valid


}
module.exports = { logIn, getExistUser }