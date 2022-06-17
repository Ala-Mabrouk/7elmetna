const connectionDb = require("../connectionDb");
const jwt = require("jsonwebtoken");

var mailtemp
function getMailFromToken(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (!err) {
            //     console.log(response);
            console.log(response.email);
            mailtemp = response.email + ""
        } else {
            console.log(err);

        }

    });
}

const addProject = (req, res) => {
    let tempProjectInfo = req.body;

    // getting  domaine-id from domaine-label:
    let domaineID
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
    var userID = "123"

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
        "select projectId from projects p, domaines d where p.projectShortName=? and p.projectDomaine=d.domaineId and d.domaineLabelle=? ";
    connectionDb.query(
        testQuery,
        [tempProjectInfo.projectShortName, tempProjectInfo.projectDomaine],
        (err, restQuery) => {
            if (!err) {
                //insert new project
                console.log(userID + "-------" + domaineID);
                insertQuery =
                    "Insert into projects(projectShortName,projectFullName,projectShortDescription,projectFullDescription,projectLocation,projectDomaine,projectDemand,projectLimits,projectOwner) values(?,?,?,?,?,?,?,?,?)";
                connectionDb.query(
                    insertQuery,
                    [
                        tempProjectInfo.projectShortName,
                        tempProjectInfo.projectFullName,
                        tempProjectInfo.projectShortDescription,
                        tempProjectInfo.projectFullDescription,
                        tempProjectInfo.projectLocation,
                        domaineID,
                        tempProjectInfo.projectDemand,
                        tempProjectInfo.projectLimits,
                        userID,
                    ],
                    (err, resInsert) => {
                        if (!err) {
                            //return res.status(200).json("Project is saved in data base");
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

    // in case of some media files 
    if (tempProjectInfo.mediaURL != null) {
        console.log("checked the media");
        //need to move media to specific folder 
        // TODO:**************

        //getting projectID
        connectionDb.query(
            "select projectId from projects p, domaines d where p.projectShortName=? and p.projectDomaine=d.domaineId and d.domaineLabelle=? ",
            [tempProjectInfo.projectShortName, tempProjectInfo.projectDomaine],
            (err, resQu) => {
                if (!err) {
                    if (resQu.length > 0) {
                        var today = new Date();
                        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        insertQuery =
                            "Insert into infoMedias(addedDate,mediaURL,relatedTo,addedBy) values(?,?,?,?)";
                        connectionDb.query(
                            insertQuery,
                            [
                                currentDate,
                                tempProjectInfo.mediaURL,
                                resQu[0].projectId,
                                userID,
                            ],
                            (err, resInsert) => {
                                if (!err) {
                                    return res.status(200).json("media and project are saved in data base");
                                } else {
                                    return res.status(500).json(err);
                                }
                            }
                        );
                    }
                } else {
                    console.log(err);
                }
            }
        );
    }
    return res.status(200).json("Project is saved in data base");

};
const getProjectDetails = (req, res) => { };
const getMyProjectDetails = (req, res) => { };

module.exports = { addProject, getProjectDetails, getMyProjectDetails };
