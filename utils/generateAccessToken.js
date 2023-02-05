const jwt = require('jsonwebtoken');
const generateAccessToken  = (email) => {
    return jwt.sign({email : email}, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = {generateAccessToken}