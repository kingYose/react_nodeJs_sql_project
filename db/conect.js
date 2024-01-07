const mysql = require('mysql2/promise');
const pool = mysql.createPool({

        host: 'localhost',
        user: 'root',
        database: 'place_holder',
        password: process.env.SQL_PASSWORD

});

module.exports = pool

// async function fillTablePhotos() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/photos')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO photos (id,albumId ,url,thumbnailUrl)
//                 VALUES(?,?,?,?)`
//                 pool.query(sql, [user.id, user.albumId, user.url, user.thumbnailUrl])
//         })
// }
// fillTablePhotos();
// async function fillTableAlbums() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/albums')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO albums (userId,id ,title)
//                         VALUES(?,?,?)`
//                 pool.query(sql, [user.userId, user.id, user.title])
//         })
// }
// fillTableAlbums();
// async function fillTablePosts() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/posts')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO posts (id, userId ,title , body)
//                                 VALUES(?,?,?,?)`
//                 pool.query(sql, [user.id, user.userId, user.title, user.body])
//         })
// }
// fillTablePosts();
// async function fillTableComments() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/comments')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO comments (id, postId, name, email , body)
//                                         VALUES(?,?,?,? ,?)`
//                 pool.query(sql, [user.id, user.postId, user.name, user.email, user.body])
//         })
// }
// fillTableComments();
// async function fillTablePasswords() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/comments')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO comments (id, postId, name, email , body)
//                                                 VALUES(?,?,?,? ,?)`
//                 pool.query(sql, [user.id, user.postId, user.name, user.email, user.body])
//         })
// }
// fillTableComments();
// async function fillTableTodos() {
//         const data = await fetch('https://jsonplaceholder.typicode.com/todos')
//                 .then((res) => res.json());
//         data.forEach(user => {
//                 const sql = `INSERT INTO todos (userId, title,completed)
//                                                 VALUES(?,?,?)`
//                 pool.query(sql, [user.userId, user.title, user.completed])
//         })
// }
// fillTableTodos()













