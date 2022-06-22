const express = require("express")
const userControl = require("../Controllers/userController");
const router = express.Router();

router.post("/signup", userControl.userSignUp)
router.post('/login', userControl.userLogin)
router.get('/:token', userControl.userInfo)
router.post('/verifToken', userControl.userToken)

module.exports = router