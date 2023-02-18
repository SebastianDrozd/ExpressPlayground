const express = require('express')
const router = express.Router()
const { getAllMachines, setMachineRating, getMachineRatingById } = require('../repos/machineRepo')
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


router.post("/complete", (req, res) => {
    serveCompletedMachines(req.body.userid, req.body.machineid)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(err.statusCode).send(err))
})
router.post("/like", (req, res) => {
    const userid = req.body.userid;
    const machineid = req.body.machineid;
    const rating = req.body.rating;
    const obj = {
        userid: userid,
        machineid: machineid,
        rating: rating
    }
    console.log("this is obj", obj)
    setMachineRating(userid, machineid, rating)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(err.statusCode).send(err))
})
router.get("/like/:id", (req, res) => {
    let machineid = req.params.id;
    getMachineRatingById(machineid)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(err.statusCode).send(err))

})

module.exports = router