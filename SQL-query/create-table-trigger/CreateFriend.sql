CREATE TABLE Friend (
	uid1 varchar(36) NOT NULL,
	uid2 varchar(36) NOT NULL,
	PRIMARY KEY(uid1, uid2),
	FOREIGN KEY(uid1) REFERENCES UserFile(uid),
	FOREIGN KEY(uid2) REFERENCES UserFile(uid)
);