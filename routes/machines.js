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
    const sql = `SELECT machines.name,machines.description,machines.difficulty ,recents.lastused
    from users
    inner join recents on users.id = recents.userid
    inner join machines on recents.machineid = machines.id
    where users.id = "${req.params.id}"
    ORDER BY lastused DESC`
    //user id is coming in from the req. this is held in the req.params.id
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result)        
    })

    
})

router.post("/recents", (req, res) => {

    //check if there is a recent already for this user and machine
    //if there is, just update the lastused date
    //if there isn't, insert a new recent machine
    let response = null;
    let noData = false
    //check if exists
    console.log("this is req.body", req.body)
    const sql1 = `SELECT * FROM recents WHERE userid = "${req.body.userid}" AND machineid = ${req.body.machineid}`
    connection.query(sql1, (err, result) => {
        if (err) res.status(500).send(err);

        //if there is a result, update the lastused date
        if (result.length > 0) {
            const sql2 = `update recents set lastused = "${new Date().toISOString().slice(0, 19).replace('T', ' ')}" where userid = "${req.body.userid}" and machineid = ${req.body.machineid}`
            connection.query(sql2,(err,result2) => {
                console.log("updated lastused date")
                res.status(200).send(result2)
            })
        }
        //if there is no result, insert a new recent
        else{
            const sql3 = `Insert into recents (machineid, userid) values (${req.body.machineid}, "${req.body.userid}")`
            connection.query(sql3,(err,result3) => {
            console.log("inserted new recent")
               res.status(201).send(result3)
        })
        }
    })
   
})

router.get("/complete/:id", (req, res) => {
    const userid = req.params.id
    const sql = `Select 
    machines.name
    from users
    INNER JOIN completed ON users.id = completed.userid
    Inner JOIN machines ON completed.machineid = machines.id
    where users.id = "${userid}"`
    connection.query(sql,(err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

router.post("/complete",(req,res) => {

    //check if there exists a completed machine for this user and machine
    let userid = req.body.userid
    let machineid = req.body.machineid
    connection.query(`Insert into completed (machineid,userid) values (${machineid},"${userid}")`,(err,result) => {
        if(err) throw err;
        console.log("inserted new completed machine")
        res.status(201).send(result)
    })

    connection.query(`Select * from machines where machines.id = ${machineid}`,(err,result) => {
        if (err) throw err;
        let points = result[0].points
        connection.query(`Select * from users where users.id = "${userid}"`,(err,result) => {
            let user = result[0]
            let newPoints = user.points + points
            connection.query(`Update users set points = ${newPoints} where users.id = "${userid}"`,(err,result) => {
                if(err) throw err;
                console.log("updated points")
            })
        })
    })    
})

module.exports = router