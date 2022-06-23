const connectionDb = require("../connectionDb");
const jwt = require("jsonwebtoken");
const util = require('util');
const query = util.promisify(connectionDb.query).bind(connectionDb);
const Project = require("../Models/Project")
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

const getProjectDetails = async (req, res) => {
    let projectFullData = ""
    const projectId = req.params.idProject
    queryDataProject = "select p.*,d.domaineLabelle,sum(c.contributionValue) as sumContributions, count(c.contributionValue)  as nbContributions from projects p, contributions c,domaines d where p.projectId=? and c.relatedTo=? and p.projectDomaine=d.domaineId ";
    queryMediaProject = "select m.addedDate,m.mediaURL,m.addedBy from infoMedias m where m.relatedTo=? "
    queryRealisationsProject = "select m.addedDate,m.mediaURL,m.addedBy from infoMedias m where m.relatedTo=? "

    try {
        try {
            resultat = await
                query(queryDataProject, [projectId, projectId])

            projectFullData = Project.fillProjectFromJSON(resultat[0])

        } catch (errDataProjet) {
            console.log(errDataProjet);
        }

        try {
            projectFullData.listMedia = await
                query(queryMediaProject, [projectId])
        } catch (errMediaInfo) {
            console.log(errMediaInfo);
        }
        try {
            projectFullData.listRealisations = await
                query(queryRealisationsProject, [projectId])
        } catch (errDataProjet) {
            console.log(errDataProjet);
        }

        console.log("the project data is :");
        console.log(projectFullData);
    }
    catch (codeErr) {
        console.log(codeErr);
    }
    if (projectFullData.projectId != null) {
        return res.status(200).json(projectFullData)
    } else {
        return res.status(500).json("smthing bad happend !")
    }

};

const getMyProjectDetails = (req, res) => {

};

const getProjectsFromDomaine = (req, res) => {
    domaineName = req.params.domaineType

};

const getAllProjects = async (req, res) => {
    let projectFullData = []
    queryDataProject = "select p.*,d.domaineLabelle,sum(c.contributionValue)as sumContributions,count(c.contributionValue)  as nbContributions  from projects p, contributions c,domaines d where c.relatedTo=p.projectId and p.projectDomaine=d.domaineId group by p.projectId ";
    try {

        resultat = await
            query(queryDataProject)


        for (let index = 0; index < resultat.length; index++) {
            projectFullData.push(Project.fillProjectFromJSON(resultat[index]))
        }
        console.log(projectFullData);
        return res.status(200).json(projectFullData)
    } catch (errDataProjet) {
        console.log(errDataProjet);
        return res.status(500).json("smthing bad happend !")
    }


};

const getProjectMedia = async (req, res) => {
    res.json({
        'message': 'File uploaded succesfully.'
    });
};

const getProjectsOfUser = async (req, res) => {
    let projectFullData = []
    const userId = req.params.idUser
    queryDataProject = "select p.*,d.domaineLabelle,sum(c.contributionValue) as sumContributions, count(c.contributionValue)  as nbContributions from projects p, contributions c,domaines d where p.projectDomaine=d.domaineId and c.relatedTo=p.projectId group by c.relatedTo having p.projectOwner=? ;";
    queryMediaProject = "select m.addedDate,m.mediaURL,m.addedBy from infoMedias m where m.relatedTo=? "
    queryRealisationsProject = "select m.addedDate,m.mediaURL,m.addedBy from infoMedias m where m.relatedTo=? "


    try {
        try {
            resultat = await
                query(queryDataProject, [userId])
            for (let index = 0; index < resultat.length; index++) {
                projectFullData.push(Project.fillProjectFromJSON(resultat[index]))
            }
        } catch (errDataProjet) {
            console.log(errDataProjet);
        }
        try {
            for (let index = 0; index < projectFullData.length; index++) {
                projectFullData[index].listMedia = await
                    query(queryMediaProject, [projectFullData[index].projectId])

            }
        } catch (errMediaInfo) {
            console.log(errMediaInfo);
        }
        try {
            for (let index = 0; index < projectFullData.length; index++) {
                projectFullData[index].listRealisations = await
                    query(queryMediaProject, [projectFullData[index].projectId])

            }
        } catch (errMediaInfo) {
            console.log(errMediaInfo);
        }

        console.log("the project data is :");
        console.log(projectFullData);
    }
    catch (codeErr) {
        console.log(codeErr);
    }
    if (projectFullData[0] != null) {
        return res.status(200).json(projectFullData)
    } else {
        return res.status(500).json("smthing bad happend !")
    }

};

module.exports = {
    addProject,
    getProjectDetails,
    getMyProjectDetails,
    getProjectsFromDomaine,
    getAllProjects,
    getProjectMedia,
    getProjectsOfUser
};
        // await new Promise(function (resolve, reject) {
        //     connectionDb.query(queryDataProject, [projectId, projectId], (errDataProjet, resDataProjet) => {
        //         if (!errDataProjet) {
        //             // projectFullData = resDataProjet[0]
        //             // console.log(projectFullData);
        //             resolve(resDataProjet[0]);


        //         } else {
        //             console.log(errDataProjet);
        //             reject(new Error(errDataProjet));
        //         }
        //     })
        // }).then(function (results) {
        //     projectFullData = results
        // })
        //     .catch(function (err) {
        //         console.log("Promise rejection error: " + err);
        //     })

        // console.log("second: ")
        // console.log(projectFullData)
        // console.log("second: ")

        // connectionDb.query(queryMediaProject, [projectId], (errMediaInfo, resMediaInfo) => {
        //     if (!errMediaInfo) {
        //         projectFullData.listMedia = resMediaInfo
        //         console.log(projectFullData);

        //     } else {
        //         console.log(errMediaInfo);
        //     }

        // })