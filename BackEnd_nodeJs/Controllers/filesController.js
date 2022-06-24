const connectionDb = require("../connectionDb");

const util = require('util');
const query = util.promisify(connectionDb.query).bind(connectionDb);


const uploadSingleFileMedia = async (req, res, next) => {
    const file = req.file

    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    // saving file path in data base

    querySaveMedia = "insert into infomedias(addedDate,mediaURL,relatedTo,addedBy)values(?,?,?,?);"
    //getting project id from the file name 
    const pId = file.filename.toString().substring(0,
        file.filename.indexOf('_')
    );
    try {
        const currentDate = new Date().toLocaleDateString()
        const filePath = "/Uploads/" + file.filename
        const r = await
            query(querySaveMedia, [currentDate, filePath, pId, 1])
    } catch (errMediaInfo) {
        console.log(errMediaInfo);
    }

    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

        , (error, req, res, next) => {
            res.status(400).send({
                error: error.message
            })
        }
}

module.exports = { uploadSingleFileMedia }