const DbError = require('../error/dbError')
const connection = require('../Utils/Connection')
const pool = require('./connectionPool')


const selectAllUsersByEmail = (email) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
        if (err) reject(new DbError())
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            connection.release();
            if (err) reject(err);
            resolve(result)
        })
    })
  })
}
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) reject(new DbError());
            resolve(result)
        })
    })
}

module.exports = {selectAllUsersByEmail,createUser}