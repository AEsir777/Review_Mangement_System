CREATE TABLE UserFile (
	uid varchar(36),
	name varchar(255) NOT NULL,
    createTime TIMESTAMP NOT NULL,
    cools INT NOT NULL,
    reviewCount INT NOT NULL,
	PRIMARY KEY(uid, name),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid) ON DELETE CASCADE
);

CREATE TRIGGER addUser
AFTER INSERT ON UserAuth
FOR EACH ROW
	INSERT INTO UserFile(uid, name, createTime, reviewCount, cools) 
    VALUES(NEW.uid, NEW.email, NOW(), 0, 0);

CREATE TRIGGER addCools
AFTER INSERT ON coolHistory
FOR EACH ROW
    UPDATE UserFile
    SET cools = cools + 1
    WHERE UserFile.uid = NEW.uid;

CREATE TRIGGER subCools
BEFORE DELETE ON coolHistory
FOR EACH ROW
    UPDATE UserFile
    SET cools = cools - 1
    WHERE UserFile.uid = OLD.uid;