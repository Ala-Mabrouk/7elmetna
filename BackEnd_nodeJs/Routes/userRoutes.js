const express = require("express")
const userControl = require("../Controllers/userController");
const router = express.Router();

router.post("/signup", userControl.userSignUp)
router.post('/login', userControl.userLogin)
router.get('/:id', userControl.userInfo)

module.exports = router