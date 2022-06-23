const express = require("express")
const fileControl = require("../Controllers/filesController");
const router = express.Router();
const handlerFile = require("../Services/handelFiles")

router.post("/upload", handlerFile.uploadFun, fileControl.uploadSingleFileMedia)


module.exports = router