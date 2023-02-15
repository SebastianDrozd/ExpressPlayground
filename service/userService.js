const { selectAllUsersByEmail, createUser } = require("../utils/user")
const bcrypt = require("bcrypt")
const uuid = require('uuid')
const connection = require('../Utils/Connection')
const { generateAccessToken } = require("../utils/generateAccessToken")
const TokenResponse = require("../response/loginTokenResponse")
const PasswordMismatchError = require("../error/passwordMismatchError")
const UserNotFoundError = require("../error/userNotFoundError")
const UserAlreadyExistsError = require("../error/UserAlreadyExistsError")
const DbError = require("../error/dbError")
const SignupSuccessResponse = require("../response/SignupSuccessResponse")
const { hashPassword } = require("../utils/passwordHasher")
const TokenInvalidError = require("../error/tokenInvalidError")
const { verifyAccessToken } = require("../utils/verifytoken")


const signUpUser = (email, password) => {
    return new Promise((resolve, reject) => {
        //query the db to see if the user exists
        selectAllUsersByEmail(email).then(result => {
            if (result.length > 0) {
                //if the user exists, reject the promise with a UserAlreadyExistsError
                reject(new UserAlreadyExistsError())
            }
            else {
                //if the user doesn't exist, hash the password and create the user
                hashPassword(email, password).then(result => {
                    createUser(result).then(result => {
                        //if the user is created, resolve the promise with a SignupSuccessResponse
                        resolve(new SignupSuccessResponse())
                    }).catch(err => {
                        //if there is an error creating the user, reject the promise with a DbError
                        reject(new DbError())
                    })
                })
            }
        })
    })
}

const loginUser = (email, password) => {
    //return a new Promise that contains the logged in users information w/ token
    return new Promise((resolve, reject) => {
        //call the selectAllUsersByEmail function from the user.js file which queries the db
        selectAllUsersByEmail(email).then(result => {
            //see if the user exists
            if (result.length > 0) {
                const user = result[0]
                bcrypt.compare(password, user.password, function (err, result) { //compare the password to the hashed password
                    if (result) {
                        let token = generateAccessToken(email) //generate a token
                        resolve(new TokenResponse(token, user.id, user.points,user.email)) //resolve promise w user object
                    }
                    else {
                        //if the password is incorrect, reject the promise with a PasswordMismatchError
                        reject(new PasswordMismatchError())
                    }
                })
            }
            else {
                //if the user doesn't exist, reject the promise with a UserNotFoundError
                reject(new UserNotFoundError())
            }
        })
    })
}

const verifyUserToken = (token) => {
    return new Promise((resolve, reject) => {   
        //call the verifyAccessToken function from the generateAccessToken.js file
        let result = verifyAccessToken(token)
        if (result.result == "success") {
            const email = result.decoded.email
            //call the selectAllUsersByEmail function from the user.js file which queries the db
            selectAllUsersByEmail(email).then(result => {
                //see if the user exists
                if (result.length > 0) {
                    const user = result[0]
                    resolve(user)
                }
                else {
                    //if the user doesn't exist, reject the promise with a UserNotFoundError
                    reject(new UserNotFoundError())
                }
            })
        }
        else {
            //if the token is invalid, reject the promise with a TokenInvalidError
            reject(new TokenInvalidError())
            
        }
    })
}

const getUserInformation = (email) => {
    return new Promise((resolve,reject) => {
        //call the selectAllUsersByEmail function from the user.js file which queries the db
        selectAllUsersByEmail(email).then(result => {
            //see if the user exists
            if (result.length > 0) {
                const user = result[0]
                resolve(user)
            }
            else {
                //if the user doesn't exist, reject the promise with a UserNotFoundError
                reject(new UserNotFoundError())
            }
        })
    })
}
module.exports = { signUpUser, loginUser,verifyUserToken,getUserInformation }