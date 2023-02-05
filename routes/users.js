const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const uuid = require('uuid')
const bcrypt = require("bcrypt")
const { hashPassword } = require('../utils/bcrypter')
const {generateAccessToken} = require('../utils/generateAccessToken')
connection.connect()

router.get('/', (req, res) => {
    console.log("connected!")
    res.send("it works!")
})

router.post('/signup', (req, res) => {
   
    //Check if user exists in the database already
    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log("user exists")
            res.status(400).send("user exists")
        }
        else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                console.log("this is hash", hash)
                const user = {
                    id: uuid.v4(),
                    email: req.body.email,
                    password: hash
                }
                connection.query('INSERT INTO users SET ?', user, (err, result) => {
                    if (err) throw err;
                    console.log("user saved")
                })
            })
            res.send("user saved")
        }
    })

})

router.post('/login', (req, res) => {
    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log("password correct,about to make a jwt")
                    let token = generateAccessToken(req.body.email)
                    console.log("this is token",token)
                    res.status(200).send({status: "logged-in",token:token})
                }
                else {
                    res.status(401).send({message: "password incorrect"})
                }
            })
        }
        else {
            res.status(404).send({message: "user not found"})
        }
    })
})

module.exports = router