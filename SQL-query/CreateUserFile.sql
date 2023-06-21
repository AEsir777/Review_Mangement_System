CREATE TABLE UserFile (
	uid varchar(36),
	name varchar(255),
	PRIMARY KEY(uid, name),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid) ON DELETE CASCADE
);

CREATE TRIGGER addUser
AFTER INSERT ON UserAuth
FOR EACH ROW
	INSERT INTO UserFile(uid, name) VALUES(NEW.uid, NEW.email);