const bcrypt = require("bcrypt")
const uuid = require('uuid')
const hashPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
                const user = {
                    id: uuid.v4(),
                    email: email,
                    password: hash
                }
                if (err) reject(err)
                resolve(user)
        })


    })
}

module.exports = { hashPassword }