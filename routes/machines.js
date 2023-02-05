const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const uuid = require('uuid')
const { reset } = require('nodemon')



router.get('/', (req, res) => {
    connection.query('SELECT * FROM machines', (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result)
    })
})
router.get("/recents/:id", (req, res) => {
    //user id is coming in from the req. this is held in the req.params.id
    console.log("this is req.params.id", req.params.id)

    connection.query()
    res.send("it works!")
})

module.exports = router