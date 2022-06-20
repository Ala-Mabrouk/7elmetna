import { User } from './user';

export class Project {
  projectId!: Number;
  projectShortName!: String;
  projectFullName!: String;
  projectShortDesc!: String;
  projectFullDesc!: String;
  projectLocation!: String;
  projectDemand: number = 0;
  projectEndDate!: Date;
  projectDomaine!: String;
  projectOwner!: User;
  projectThumbNail: String = '../../assets/cover-photo.png';
  projectMedia!: Array<String>;
  nbContributions: Number = 0;
  projectEarned: number = 0;
  projectProgress: String = 'width: 0%';
  projectLefttime: String = '-1 jours,-1 heures,-1 minutes';
  constructor() {}
  fillProject(
    pId: Number,
    pShortName: String,
    pFullName: String,
    pShortDesc: String,
    pFullDesc: String,
    pLocation: String,
    pDemand: number,
    pEndDate: Date,
    pDomaine: String,
    pOwner: User,
    pThumbNail: String,
    pMedia: Array<String>,
    pNbContributions: Number,
    ptEarned: number
  ): Project {
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
  static fillProjectFromJSON(elmentJson: any): Project {
    let tempP = new Project();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    tempP.projectId = elmentJson.projectId;
    tempP.projectShortName = elmentJson.projectShortName;
    tempP.projectFullName = elmentJson.projectFullName;
    tempP.projectShortDesc = elmentJson.projectShortDescription;
    tempP.projectFullDesc = elmentJson.projectFullDescription;
    tempP.projectLocation = elmentJson.projectLocation;
    tempP.projectDemand = elmentJson.projectDemand;
    tempP.projectEndDate = elmentJson.projectLimits;
    //
    console.log(new Date(tempP.projectEndDate).toDateString());

    const resDate = Math.floor(
      new Date(tempP.projectEndDate).getTime() - new Date().getTime()
    );

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

    tempP.projectLefttime =
      days + ' jours ' + hours + ' heures ' + minutes + ' minutes';

    return tempP;
  }
}
