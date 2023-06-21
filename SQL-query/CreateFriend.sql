CREATE TABLE Friend (
	uid1 varchar(255),
	uid2 varchar(255),
	PRIMARY KEY(uid1, uid2),
	FOREIGN KEY(uid1) REFERENCES UserFile(uid),
	FOREIGN KEY(uid2) REFERENCES UserFile(uid)
);