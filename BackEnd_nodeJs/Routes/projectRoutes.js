const express = require("express")
const router = express.Router()
const projectControl = require("../Controllers/projectController")
const authentication = require("../Services/authentication")

router.post('/newProject', authentication.authenticateToken, projectControl.addProject)
router.get('/myProject/:id', authentication.authenticateToken, projectControl.getMyProjectDetails)
router.get('/:id', projectControl.getProjectDetails)

module.exports = router
