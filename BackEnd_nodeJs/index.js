const express = require("express")
var cors = require("cors")
const userRoute = require("./Routes/userRoutes")
const projectRoute = require("./Routes/projectRoutes.js")


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/user', userRoute)
app.use('/project', projectRoute)

module.exports = app