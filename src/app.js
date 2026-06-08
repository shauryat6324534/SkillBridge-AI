const express = require("express")

const app = express()

app.use(express.json())//middleware

// require all routes
const authRouter= require("./routes/auth.routes")

// using all routes here
app.use("/api/auth",authRouter)


module.exports = app