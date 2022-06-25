const express = require("express")
const sharedDataControl = require("../Controllers/SharedInfoController");
const router = express.Router();

router.get("/differentsInfo", sharedDataControl.getSharedData)


module.exports = router