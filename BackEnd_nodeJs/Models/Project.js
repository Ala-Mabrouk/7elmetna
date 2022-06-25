const { resolve } = require('path');
function fillProject(pId, pShortName, pFullName, pShortDesc, pFullDesc, pLocation, pDemand, pEndDate, pDomaine, pOwner, pThumbNail, pMedia, pNbContributions, ptEarned) {
    let tempP = new Project();
    tempP.projectId = pId;
    tempP.projectShortName = pShortName;
    tempP.projectFullName = pFullName;
    tempP.projectShortDesc = pShortDesc;
    tempP.projectFullDesc = pFullDesc;
    tempP.projectLocation = pLocation;
    tempP.projectDemand = pDemand;
    tempP.projectEndDate = pEndDate;
    tempP.projectDomaine = pDomaine;
    tempP.projectOwner = pOwner;
    tempP.projectThumbNail = pThumbNail;
    tempP.projectMedia = pMedia;
    tempP.nbContributions = pNbContributions;
    tempP.projectEarned = ptEarned;
    tempP.projectProgress = 'width: ' + (ptEarned / pDemand) * 100 + '%';
    return tempP;
}
function fillProjectFromJSON(elmentJson) {
    console.log(elmentJson);
    var tempP = {}
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    tempP.projectId = elmentJson.projectId;
    tempP.projectOwner = elmentJson.projectOwner
    tempP.projectShortName = elmentJson.projectShortName;
    tempP.projectFullName = elmentJson.projectFullName;
    tempP.projectShortDesc = elmentJson.projectShortDescription;
    tempP.projectFullDesc = elmentJson.projectFullDescription;
    tempP.projectLocation = elmentJson.projectLocation;
    tempP.projectDemand = elmentJson.projectDemand;
    tempP.projectEndDate = elmentJson.projectLimits;
    //
    console.log(new Date(tempP.projectEndDate).toDateString());
    const resDate = Math.floor(new Date(tempP.projectEndDate).getTime() - new Date().getTime());
    const days = Math.floor(resDate / day);
    const hours = Math.floor((resDate % days) / hour);
    const minutes = Math.floor((resDate % hour) / minute);
    //
    tempP.projectDomaine = elmentJson.domaineLabelle;
    //  tempP.projectOwner = elmentJson.;

    //  tempP.projectThumbNail = elmentJson.;
    // tempP.projectMedia = elmentJson.;
    tempP.nbContributions = elmentJson.nbContributions;
    tempP.projectEarned = elmentJson.sumContributions;
    tempP.projectProgress =
        'width: ' + (tempP.projectEarned / tempP.projectDemand) * 100 + '%';
    if (days == 0 && hours == 0 && minute == 0) {
        tempP.projectLefttime = "Temps ecoulé"
    } else {
        tempP.projectLefttime =
            days + ' jours ' + hours + ' heures ' + minutes + ' minutes';
    }
    if (elmentJson.listMedia) {
        tempP.listMedia = elmentJson.listMedia

        tempP.projectThumbNail = 'http://localhost:3033/' + elmentJson.listMedia[0].mediaURL;
    } else {
        tempP.projectThumbNail = "../../assets/cover-photo.png";
    }

    tempP.projectLefttime =
        days + ' Jours ' + hours + ' h  ' + minutes + ' m';
    return tempP;
}
module.exports = { fillProjectFromJSON, fillProject }