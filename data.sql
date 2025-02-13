create table usersdetails(uid int primary key,name varchar(100)
,mobile varchar(100),
email varchar(100),
role varchar(100),
approved int default 0
,profilepic varchar(100),
videoname varchar(100));

create table castformovie(cmid int primary key,
moviename varchar(100),
movieimage varchar(100)
,description text,
movieplanned date,
moviereleased date,
postdate varchar(100),
status varchar(100));

create table castrequired(crid int primary key,
castname varchar(100),
role varchar(100),
totalnoofuser varchar(100),
cmid int
,FOREIGN key(cmid) REFERENCES castformovie(cmid) ON DELETE CASCADE
,status varchar(100));

create table castfileupload(cfid int primary key
,crid int,FOREIGN key(crid) 
REFERENCES castrequired(crid) ON DELETE CASCADE,
fileupload varchar(100)
,status varchar(100) default 'pending',
description varchar(100));

create table chatwithuser(cuid int primary key,fromuser int,
touser int,chat text,messagedate datetime default
CURRENT_TIMESTAMP);