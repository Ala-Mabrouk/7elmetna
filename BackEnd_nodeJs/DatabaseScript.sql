 

-- Users Table
create table users(
userId int primary key auto_increment,
userName varchar(30) NOT NULL,
userLastName varchar(30) NOT NULL,
userBirthDate DATE DEFAULT "2008-11-11",
userEmail varchar(200) NOT NULL,
userPassword varchar(250) NOT NULL,
userPhone varchar(20) NOT NULL,
userNumCardFunding varchar(20),
unique(userEmail),
unique(userNumCardFunding)
);

-- all domaines Table
create table domaines(
    domaineId int primary key auto_increment,
    domaineLabelle varchar(255) NOT NULL,
    domaineDesc varchar(1000)
);

-- all projects Table
create table projects(
projectId int primary key auto_increment,
projectShortName varchar(30),
projectFullName varchar(255) NOT NULL,
projectShortDescription TEXT(200),
projectFullDescription MEDIUMTEXT NOT NULL,
projectLocation varchar(255) NOT NULL,
projectDemand float, check (projectDemand>0),
projectLimits datetime NOT NULL,
projectDomaine int,
projectOwner int,
FOREIGN KEY (projectOwner) REFERENCES users(userId), 
FOREIGN KEY (projectDomaine) REFERENCES domaines(domaineId), 
unique(projectShortName),
 );

-- Contributions related to each project
create table contributions(
    contributionId int primary key auto_increment,
    contributionDate DATETIME  NOT NULL,
    contributionValue FLOAT,
    check (contributionValue>0)
    relatedTo int,
    addedBy int,
    FOREIGN KEY (relatedTo) REFERENCES projects(projectId)
);

-- realizations of every project
create table realizations(
    realizationId int primary key auto_increment,
    addedDate varchar(255) NOT NULL,
    rmediaURL varchar(1000) NOT NULL,
    relatedTo int,
    addedBy int,
    FOREIGN KEY (addedBy) REFERENCES users(userId), 
    FOREIGN KEY (relatedTo) REFERENCES projects(projectId) 
);

-- all media that contain information about the project
create table infoMedias(
    mediaId int primary key auto_increment,
    addedDate varchar(255) NOT NULL,
    mediaURL varchar(1000) NOT NULL,
    relatedTo int,
    addedBy int,
    FOREIGN KEY (addedBy) REFERENCES users(userId), 
    FOREIGN KEY (relatedTo) REFERENCES projects(projectId)
);






-- Inserting data for testing 

 

insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ala","ben foulen","alabenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ali","ben foulen","alibenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("sami","ben foulen","samibenfoulen@mail.com","123456","+21688552299" );

insert into domaines(domaineLabelle,domaineDesc) values("tech","tech projects");
insert into domaines(domaineLabelle,domaineDesc) values("Entreprenariat","Entreprenariat projects");
insert into domaines(domaineLabelle,domaineDesc) values(" Santé "," Santé  projects");
insert into domaines(domaineLabelle,domaineDesc) values(" Artisanat "," Artisanat  projects");
  insert into projects(projectShortName,projectFullName,projectShortDescription,projectFullDescription,projectLocation,projectDomaine,
 projectOwner,projectDemand,projectLimits)values("7elmatna","7elmetna by A,S,G","alot of words","alot of words","tunisia",2,1,5000,"2022-12-31");

 insert into projects(projectShortName,projectFullName,projectShortDescription,projectFullDescription,projectLocation,projectDomaine,
 projectOwner,projectDemand,projectLimits)values("fa5ar zman","fa5ar zman by samiya","alot of words","alot of words","chebba",4,1,2000,"2022-12-31");

  insert into projects(projectShortName,projectFullName,projectShortDescription,projectFullDescription,projectLocation,projectDomaine,
 projectOwner,projectDemand,projectLimits)values("Chachiet el bay","Chachiet el bay by 3am Ali","alot of words","alot of words","Mahdia",4,1,2500,"2022-09-29");

 

insert into infomedias(addedDate,mediaURL,relatedTo,addedBy)values("2022-06-18","./Uploads/8_Thu Jun 23 2022_ggx.png",8,1);
insert into infomedias(addedDate,mediaURL,relatedTo,addedBy)values("2022-06-18","./Uploads/8_Thu Jun 23 2022_n71.jpg",8,1);
insert into infomedias(addedDate,mediaURL,relatedTo,addedBy)values("2022-06-18","./Uploads/8_Thu Jun 23 2022_yf5.jpg",8,1);

insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-06-30",150,8);
insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-08-30",10,8);
insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-06-10",150,9);
insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-11-30",10,9);
insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-10-18",150,10);
insert into contributions(contributionDate,contributionValue,relatedTo) values("2022-09-02",10,10);