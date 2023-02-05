const jwt = require('jsonwebtoken');
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  
  }
  module.exports = authenticateToken