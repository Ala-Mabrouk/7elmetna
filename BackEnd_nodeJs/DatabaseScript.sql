 

-- Users Table
create table users(
userId int primary key auto_increment,
userName varchar(30),
userLastName varchar(30),
userEmail varchar(200),
userPassword varchar(250),
userPhone varchar(20),
unique(userEmail)
);






-- Inserting data for testing 

 

insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ala","ben foulen","alabenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("ali","ben foulen","alibenfoulen@mail.com","123456","+21688552299" );
insert into users(userName,userLastName,userEmail,userPassword,userPhone,userRoleID) values("sami","ben foulen","samibenfoulen@mail.com","123456","+21688552299" );
