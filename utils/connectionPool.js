const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'database-1.cmvnojrlgtyb.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'abcd12345',
    database : 'hackerzone'
})

const connect = pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
    }
    return connection
})

module.exports = pool;