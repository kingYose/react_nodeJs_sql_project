const pool = require('./conect')



async function getAllPosts() {
        const sql = `SELECT * FROM posts`;
        const data = await pool.query(sql)
        return data;
}

async function getPost(user) {
        console.log(user.userId);
        const sql = `SELECT * FROM posts WHERE userId=?`
        const data = await pool.query(sql, [user.body.of])
        return data;
}

async function addPost(dataObj) {   //data is an object{data.userId, data.title, data.body}
        const sql = `INSERT INTO posts (userId,title,body)
        values (?,?,?)`

        const data = await pool.query(sql, [dataObj.userId, dataObj.body.title, dataObj.body.body]);
        return data;
}

async function updatePosts(dataObj) {  //data is an object{data.userId, data.title, data.body}
        const sql = `UPDATE posts SET posts.title=?,posts.body=? WHERE posts.userId=?`
        const data = await pool.query(
                sql, [dataObj.body.title, dataObj.body.body, dataObj.userId])
        console.log(data);
        return data;
}

async function deletePosts(dataObj) {  //data is an object{data.userId, data.postId}
        const sql = `DELETE FROM posts  WHERE userId=? AND id=?`
        const data = await pool.query(sql, [dataObj.userId, dataObj.params.postId])
        return data;
}
module.exports = { getAllPosts, deletePosts, updatePosts, addPost, getPost }

