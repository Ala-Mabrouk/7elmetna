const express = require("express")
const router = express.Router()
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './Uploads' });
const projectControl = require("../Controllers/projectController")
const authentication = require("../Services/authentication")



router.get('/allProjects', projectControl.getAllProjects)
router.post('/newProject', authentication.authenticateToken, projectControl.addProject)
router.get('/myProject/:id', authentication.authenticateToken, projectControl.getMyProjectDetails)
router.get('/:id', projectControl.getProjectDetails)
router.get('/getProjectDetails/:idProject', projectControl.getProjectDetails)
router.post('/getProjectMedia', multipartMiddleware, projectControl.getProjectMedia)
router.get('/userProjects/:idUser', projectControl.getProjectsOfUser)


module.exports = router
