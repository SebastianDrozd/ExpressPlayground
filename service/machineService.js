const CompletedMachineExistsError = require("../error/completedMachineExistsError");
const MachineDoesNotExistError = require("../error/machineDoesNotExistError");
const { getUserRecentMachines, getCompletedMachines, getUserMachines, updatelastUsedDate, createNewRecent, getAllCompletedMachines, getMachineById, getUserById, createNewCompletedMachine, updateUserPoints, updateMachineOwns } = require("../repos/machineRepo");
const CreatedCompletedMachineResponse = require("../response/createdCompletedMachineResponse");


const servGetAllUserRecentMachines = (id) => {
    return new Promise((resolve, reject) => {
       getUserRecentMachines(id).then(result => {
           resolve(result)
       }).catch(err => {    
           reject(err)   
       })
    });
}

const serveGetAllCompletedmachines = (id) => {
    return new Promise((resolve,reject) => {
        getCompletedMachines(id).then(result => {  
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

const serveRecentMachines = (userId,machineId) => {
    console.log("this is userid and machineid in service",userId,machineId)
    return new Promise((resolve,reject) => {
       getUserMachines(userId,machineId).then(result => {
        console.log("this is result in service",result)
        if(result.length  > 0){
            //if there is a result, update the lastused date
            updatelastUsedDate(userId,machineId).then(result => {
                resolve(result);
            }).catch(err => {    
                reject(err);   
            })
        }
        else{
              //if there is no result, insert a new recent
              createNewRecent(userId,machineId).then(result => {
                resolve(result)
              }).catch(err => {
                reject(err)
            })
        }
       })
    })
}

const serveCompletedMachines= (userid,machineid) => {
    return new Promise((resolve,reject) => {
        console.log("this is userid and machineid in service",userid,machineid)
        //check if there already exists a completed machine with this userid and machineid
        getAllCompletedMachines(userid,machineid).then(result => {
            if(result.length > 0){
                //if there is a result, do nothing
                reject(new CompletedMachineExistsError())
            }
            else{
                //if there is no result, insert a new completed machine
                createNewCompletedMachine(userid,machineid).then(result => {
                    //update the users points

                    //first grab the machine and get its points
                    getMachineById(machineid).then(result2 => {
                        if(result2.length === 0){
                            reject(new MachineDoesNotExistError());
                        }
                        else{
                            updateMachineOwns(machineid).then(result3 => {}).catch(err => { reject(err) })

                            let points = result2[0].points; //now we have the points from the machine
                            //now grab the user and get its points
                            getUserById(userid).then(result => {
                                let user = result[0]       ;        
                                let newPoints = user.points + points;
                                //now update the users points
                                updateUserPoints(userid,newPoints).then(result => {
                                    resolve(new CreatedCompletedMachineResponse());
                                }).catch(err => {
                                    reject(err);
                                })
                            })
                            
                        }
                       
                    })
                }).catch(err => {
                    reject(err)
                })
            }
        })
    })
}

const serverGetAMachineById = (id) => {
    return new Promise((resolve,reject) => {
        getMachineById(id).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {serverGetAMachineById,serveCompletedMachines ,servGetAllUserRecentMachines,serveGetAllCompletedmachines,serveRecentMachines }