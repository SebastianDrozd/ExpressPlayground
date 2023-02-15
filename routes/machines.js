const express = require('express')
const router = express.Router()
const connection = require('../Utils/Connection')
const { getAllMachines } = require('../repos/machineRepo')
const { servGetAllUserRecentMachines, serveGetAllCompletedmachines, serveRecentMachines, serveCompletedMachines, serverGetAMachineById } = require('../service/machineService')



router.get('/', (req, res) => {
    getAllMachines()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})
router.get('/:id',(req,res) => {
    serverGetAMachineById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(err.statusCode).send(err))
})


router.get("/recents/:id", (req, res) => {
    servGetAllUserRecentMachines(req.params.id)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})


router.post("/recents", (req, res) => {
    serveRecentMachines(req.body.userid, req.body.machineid)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})

router.get("/complete/:id", (req, res) => {
    serveGetAllCompletedmachines(req.params.id)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})


router.post("/complete2", (req, res) => {
    serveCompletedMachines(req.body.userid, req.body.machineid)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})

module.exports = router