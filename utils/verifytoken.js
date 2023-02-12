const jwt = require('jsonwebtoken');
const verifyAccessToken =(token) => {

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded)
        return {result: "success",decoded};
    } catch (err) {
        return {result: "failure",err};
    }
}

module.exports = {verifyAccessToken}