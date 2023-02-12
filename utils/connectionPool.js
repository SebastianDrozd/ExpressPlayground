const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'hackerzone'
})

const connect = pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
    }
    return connection
})

module.exports = pool;