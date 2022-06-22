const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser");

const userRoute = require("./Routes/userRoutes")
const projectRoute = require("./Routes/projectRoutes.js")
const multer = require('multer');


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, './Uploads')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    // fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //         //Error 
    //         cb(new Error('Please upload JPG and PNG images only!'))
    //     }
    //     //Success 
    //     cb(undefined, true)
    // }
})

app.post("/files/upload", upload.single("uploadedImage"), (req, res, next) => {
    const file = req.file
    console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
}
)

app.use('/user', userRoute)
app.use('/project', projectRoute)

module.exports = app