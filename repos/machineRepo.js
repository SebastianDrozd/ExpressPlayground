const ConnectionError = require('../error/connectionError')
const DbError = require('../error/dbError')
const CreatedCompletedMachineResponse = require('../response/createdCompletedMachineResponse')
const MachineOwnsResponse = require('../response/machineOwnsResponse')
const RecentMachineCreatedResponse = require('../response/RecentMachineCreatedResponse')
const updatelastUsedDateResponse = require('../response/updateLastUsedDateResponse')
const pool = require('../utils/connectionPool')




const getAllMachines = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError())
            connection.query('SELECT * FROM machines', (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const getMachineById = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError());
            connection.query(`SELECT * FROM machines WHERE id = ${id}`, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const getAllRecentMachines = () => {

}

const getUserMachines = (userid, machineid) => {
    return new Promise((resolve, reject) => {
        const sql1 = `SELECT * FROM recents WHERE userid = "${userid}" AND machineid = ${machineid}`
        pool.getConnection((err, connection) => {
            connection.query(sql1, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const getUserRecentMachines = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT machines.id,machines.name,machines.description,machines.difficulty,machines.owns ,recents.lastused
        from users
        inner join recents on users.id = recents.userid
        inner join machines on recents.machineid = machines.id
        where users.id = "${userId}"
        ORDER BY lastused DESC`
        pool.getConnection((err, connection) => {
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const getCompletedMachines = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `Select 
    machines.name,
   completed.datecompleted
    from users
    INNER JOIN completed ON users.id = completed.userid
    Inner JOIN machines ON completed.machineid = machines.id
    where users.id = "${userId}"`
        pool.getConnection((err, connection) => {
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const updatelastUsedDate = (userid, machineid) => {
    console.log("this is userid and machineid in repo", userid, machineid)
    return new Promise((resolve, reject) => {
        const sql2 = `update recents set lastused = "${new Date().toISOString().slice(0, 19).replace('T', ' ')}" where userid = "${userid}" and machineid = ${machineid}`
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError())
            connection.query(sql2, (err, result) => {
                console.log("this is result in repo", result)
                connection.release();
                if (err) reject(new DbError())
                resolve(new updatelastUsedDateResponse())
            })
        })
    })

}

const createNewRecent = (userid, machineid) => {
    return new Promise((resolve, reject) => {
        const sql3 = `Insert into recents (machineid, userid) values (${machineid}, "${userid}")`
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError())
            connection.query(sql3, (err, result) => {
                connection.release();
                if (err) reject(new DbError())
                resolve(new RecentMachineCreatedResponse())
            })
        })
    })
}

const createNewCompletedMachine = (userid, machineid) => {
    return new Promise((resolve, reject) => {
        const sql4 = `Insert into completed (machineid, userid) values (${machineid}, "${userid}")`
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError())
            connection.query(sql4, (err, result) => {
                connection.release();
                if (err) reject(new DbError())
                resolve(new CreatedCompletedMachineResponse())
            })
        })
    })
}

const getAllCompletedMachines = (userid, machineid) => {
    return new Promise((resolve, reject) => {
        const sql5 = `SELECT * FROM completed WHERE userid = "${userid}" AND machineid = ${machineid}`
        pool.getConnection((err, connection) => {
            if(err) reject(new ConnectionError())
            connection.query(sql5, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const updateUserPoints = (userid, points) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            const sql = `UPDATE users SET points = ${points} WHERE id = "${userid}"`
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(new ConnectionError());
            connection.query(`SELECT * FROM users WHERE id = "${id}"`, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(result)
            })
        })
    })
}

const updateMachineOwns = (machineid) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err) reject(new ConnectionError());
            connection.query(`UPDATE machines SET owns = owns + 1 WHERE id = ${machineid}`, (err, result) => {
                connection.release();
                if (err) reject(new DbError());
                resolve(new MachineOwnsResponse())
            })
        })
    })
}



module.exports = {updateMachineOwns, createNewCompletedMachine,updateUserPoints,getUserById,getAllCompletedMachines, getMachineById, getAllMachines, getUserRecentMachines, getCompletedMachines, getUserMachines, updatelastUsedDate, createNewRecent }