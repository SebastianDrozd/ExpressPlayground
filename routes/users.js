const express = require('express')
const router = express.Router()
const { signUpUser, loginUser, verifyUserToken, getUserInformation } = require('../service/userService')


router.get("/:email", (req, res) => {
    getUserInformation(req.params.email)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})

router.post("/verify", (req, res) => {
    verifyUserToken(req.body.token)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))

})

router.post("/signup", (req, res) => {
    signUpUser(req.body.email, req.body.password)
        .then(result => res.send(result))
        .catch(err => res.status(err.statusCode).send(err))
})


router.post("/login", (req, res) => {
    loginUser(req.body.email, req.body.password)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})



module.exports = router