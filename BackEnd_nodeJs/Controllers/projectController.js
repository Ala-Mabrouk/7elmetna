const connectionDb = require("../connectionDb");
const jwt = require("jsonwebtoken");
var mailtemp;
function getMailFromToken(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (!err) {
            //     console.log(response);
            console.log(response.email);
            mailtemp = response.email + "";
        } else {
            console.log(err);
        }
    });
}
const addProject = (req, res) => {
    let tempProjectInfo = req.body;

    // getting  domaine-id from domaine-label:
    let domaineID = "125"
    connectionDb.query(
        "select domaineId from domaines where domaineLabelle=?",
        [tempProjectInfo.projectDomaine],
        (err, resq) => {
            if (!err) {
                if (resq.length > 0) {
                    domaineID = resq[0].domaineId
                }
                //res[0].domaineId;
            } else {
                console.log(err);
            }
        }
    );
    //need to get user Id from email:
    getMailFromToken(req);
    console.log("this is mail temp : " + mailtemp);
    let userID = "123"

    connectionDb.query(
        "select userId from users where userEmail=?",
        [mailtemp + ""],
        (err, resQu) => {
            if (!err) {
                if (resQu.length > 0) {
                    userID = resQu[0].userId
                }
            } else {
                console.log(err);
            }
        }
    );
    let testQuery =
        "select projectId from Projects p, domaines d where p.projectShortName=? and p.projectDomaine=d.domaineId and d.domaineLabelle=? ";
    connectionDb.query(
        testQuery,
        [tempProjectInfo.projectShortName, tempProjectInfo.projectDomaine],
        (err, restQuery) => {
            if (!err) {
                //insert new project
                console.log(userID + "-------" + domaineID);
                insertQuery =
                    "Insert into Projects(projectShortName,projectFullName,projectShortDescription,projectFullDescription,projectLocation,projectDomaine,projectPhotosURL,projectVedioURL,projectOwner) values(?,?,?,?,?,?,?,?,?)";
                connectionDb.query(
                    insertQuery,
                    [
                        tempProjectInfo.projectShortName,
                        tempProjectInfo.projectFullName,
                        tempProjectInfo.projectShortDescription,
                        tempProjectInfo.projectFullDescription,
                        tempProjectInfo.projectLocation,
                        domaineID,
                        tempProjectInfo.projectPhotosURL,
                        tempProjectInfo.projectVedioURL,
                        userID,
                    ],
                    (err, resInsert) => {
                        if (!err) {
                            return res.status(200).json("Project is saved in data base");
                        } else {
                            return res.status(500).json(err);
                        }
                    }
                );
            } else {
                return res.status(400).json("Project already exist !");
            }
        }
    );
};
const getProjectDetails = (req, res) => { };
const getMyProjectDetails = (req, res) => { };

module.exports = { addProject, getProjectDetails, getMyProjectDetails };
