CREATE TABLE UserFile (
	uid varchar(36),
	name varchar(255),
    createTime TIMESTAMP,
    cools INT,
    reviewCount INT,
	PRIMARY KEY(uid, name),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid) ON DELETE CASCADE
);

CREATE TRIGGER addUser
AFTER INSERT ON UserAuth
FOR EACH ROW
	INSERT INTO UserFile(uid, name, createTime, cools) 
    VALUES(NEW.uid, NEW.email, NOW(), 0, 0);

CREATE TRIGGER addCools
AFTER INSERT ON coolHistory
FOR EACH ROW
    UPDATE UserFile
    SET cool = cool + 1
    WHERE review.rid = NEW.rid

CREATE TRIGGER subCools
BEFORE DELETE ON coolHistory
FOR EACH ROW
    UPDATE review
    SET cool = cool - 1
    WHERE review.rid = OLD.rid