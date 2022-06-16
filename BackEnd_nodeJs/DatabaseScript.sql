 

-- Users Table
create table users(
userId int primary key auto_increment,
userName varchar(30) NOT NULL,
userLastName varchar(30) NOT NULL,
userEmail varchar(200) NOT NULL,
userPassword varchar(250) NOT NULL,
userPhone varchar(20) NOT NULL,
unique(userEmail)
);

create table domaines(
    domaineId int primary key auto_increment,
    domaineLabelle varchar(255) NOT NULL,
    domaineDesc varchar(1000)
)
create table projects(
projectId int primary key auto_increment,
projectShortName varchar(30),
projectFullName varchar(255) NOT NULL,
projectShortDescription TEXT(200),
projectFullDescription MEDIUMTEXT NOT NULL,
projectLocation varchar(255) NOT NULL,
projectDomaine int,
projectPhotosURL varchar(1000) NOT NULL,
projectVedioURL varchar(1000),
projectOwner int,
FOREIGN KEY (projectOwner) REFERENCES users(userId), 
FOREIGN KEY (projectDomaine) REFERENCES domaines(domaineId), 
unique(projectShortName),
);





-- Inserting data for testing 

 

insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ala","ben foulen","alabenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ali","ben foulen","alibenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("sami","ben foulen","samibenfoulen@mail.com","123456","+21688552299" );

insert into domaines(domaineLabelle,domaineDesc) values("tech","tech projects");
