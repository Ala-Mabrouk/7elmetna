const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser");

const userRoute = require("./Routes/userRoutes")
const projectRoute = require("./Routes/projectRoutes.js")


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

app.use('/user', userRoute)
app.use('/project', projectRoute)

module.exports = app