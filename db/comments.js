const pool = require('./conect')
const mysql = require('mysql2');





async function getComments(post) {
        const sql = `SELECT * FROM comments WHERE postId=?`
        const data = await pool.query(sql, [post]);
        console.log(data);
        return data;
}

async function addComment(dataObj) {   //data is an object{data.userId,data.name,data.email, data.body}
        const sql = `INSERT INTO comments (postId,name,email,body)
        values (?,?,?,?)`
        const data = await pool.query(sql, [dataObj.params.postId, dataObj.body.name, dataObj.body.email, dataObj.body.body]);
        return data;
}

// async function updateComment(dataObj) {  //data is an object{data.postId,  data.body ,data.id,}
//         const sql = `UPDATE comments SET comments.body=? WHERE comments.postId=? AND comments.id=?`
//         const data = await pool.query(
//                 sql, [dataObj.body, dataObj.postId, dataObj.id])
//         console.log(data);
//         return data;
// }

async function deleteComment(dataObj) {  //data is an object{data.userId, data.postId}
        const sql = `DELETE comments FROM comments JOIN post on comments.postId=? WHERE comments.id=?  AND post.userId=?`
        const data = await pool.query(sql, [dataObj.params.postId, dataObj.params.id, dataObj.params.userId])
        return data;
}
module.exports = { getComments, deleteComment, addComment }




