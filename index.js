const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const jwt = require('./middleware/jwtmiddleware')
const app = express()
const PORT = 4000
require('dotenv').config()

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

app.use("/api/v1/users", require("./routes/users"))
//I took out the middleware here to test the route
app.use("/api/v1/machines",jwt, require("./routes/machines"))
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT)
  
  })
  