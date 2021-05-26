CREATE USER 'ddoboard'@'%';
ALTER USER 'ddoboard'@'%' IDENTIFIED BY 'ddoboard' ;

CREATE DATABASE `ddoboard`;

GRANT Alter ON ddoboard.* TO 'ddoboard'@'%';
GRANT Create ON ddoboard.* TO 'ddoboard'@'%';
GRANT Create view ON ddoboard.* TO 'ddoboard'@'%';
GRANT Delete ON ddoboard.* TO 'ddoboard'@'%';
GRANT Delete history ON ddoboard.* TO 'ddoboard'@'%';
GRANT Drop ON ddoboard.* TO 'ddoboard'@'%';
GRANT Grant option ON ddoboard.* TO 'ddoboard'@'%';
GRANT Index ON ddoboard.* TO 'ddoboard'@'%';
GRANT Insert ON ddoboard.* TO 'ddoboard'@'%';
GRANT References ON ddoboard.* TO 'ddoboard'@'%';
GRANT Select ON ddoboard.* TO 'ddoboard'@'%';
GRANT Show view ON ddoboard.* TO 'ddoboard'@'%';
GRANT Trigger ON ddoboard.* TO 'ddoboard'@'%';
GRANT Update ON ddoboard.* TO 'ddoboard'@'%';
