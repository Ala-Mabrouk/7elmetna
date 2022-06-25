const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser");

const userRoute = require("./Routes/userRoutes")
const filesRoute = require("./Routes/filesRoutes")
const projectRoute = require("./Routes/projectRoutes.js")
const sharedDataRoute = require("./Routes/sharedInfoRoutes")



const app = express()

app.use(express.static('files'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('./'))
app.use(cors())
app.use('/user', userRoute)
app.use('/project', projectRoute)
app.use('/files', filesRoute)
app.use("/info", sharedDataRoute)

module.exports = app