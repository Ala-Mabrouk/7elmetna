const multer = require('multer');

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
        // Setting Image Size Limit to 100MBs
        fileSize: 100000000
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
module.exports = { uploadFun: upload.single("uploadedImage") }