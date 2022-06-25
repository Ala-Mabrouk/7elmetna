const connectionDb = require("../connectionDb");
const util = require('util');
const query = util.promisify(connectionDb.query).bind(connectionDb);
const Project = require("../Models/Project")


const getSharedData = async (req, res) => {
    var sharedData = {}
    queryDataNbProject = "select count(p.projectId)  as nbProjects from projects p ";
    queryNbContribution = "select count(c.contributionId)  as nbContributions from contributions c;"
    queryAllContributionValue = "select sum(c.contributionValue)as sommeContributions from contributions c;"

    try {

        const a = await
            query(queryDataNbProject)
        sharedData.nbProjects = a[0].nbProjects
        const b = await
            query(queryNbContribution)
        sharedData.nbContibutions = b[0].nbContributions
        const c = await
            query(queryAllContributionValue)
        sharedData.sumContributions = c[0].sommeContributions
        console.log(sharedData);
        return res.status(200).json(sharedData)


    } catch (errDataProjet) {
        console.log(errDataProjet);
        return res.status(500).json("smthing bad happend !")
    }


};

module.exports = {
    getSharedData

};