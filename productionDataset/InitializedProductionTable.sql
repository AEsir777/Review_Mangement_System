USE cs348;

CREATE TABLE Location (
    lid INT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL
);

CREATE TABLE Business (
	bid VARCHAR(36) PRIMARY KEY,
    longitude DOUBLE NOT NULL,
    latitude DOUBLE NOT NULL,
    hours VARCHAR(255),
    lid INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postalCode VARCHAR(255) NOT NULL,
    stars INT,
    reviewCount INT NOT NULL,
    isOpen INT NOT NULL
);

CREATE TABLE Category (
    bid VARCHAR(36),
    cate VARCHAR(500),
    PRIMARY KEY (bid, cate)
);

CREATE TABLE UserAuth (
    uid varchar(36) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    pwd varchar(255) NOT NULL,
    PRIMARY KEY (uid)
);

CREATE TABLE Review (
    rid VARCHAR(36) PRIMARY KEY,
    date DATE NOT NULL,
	text LONGTEXT,
    stars INT NOT NULL,
    cool INT NOT NULL
);

CREATE TABLE UserFile (
	uid varchar(36),
	name varchar(255) NOT NULL,
    createTime TIMESTAMP NOT NULL,
    cools INT NOT NULL,
    reviewCount INT NOT NULL,
	PRIMARY KEY(uid, name),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid) ON DELETE CASCADE
);

CREATE TABLE ReviewWith (
    bid VARCHAR(36) NOT NULL,
    uid VARCHAR(36) NOT NULL,
	rid VARCHAR(36) NOT NULL,
	FOREIGN KEY (bid) REFERENCES Business(bid),
	FOREIGN KEY (uid) REFERENCES UserFile(uid)
);

CREATE TABLE Friend (
	uid1 varchar(36) NOT NULL,
	uid2 varchar(36) NOT NULL,
	PRIMARY KEY(uid1, uid2),
	FOREIGN KEY(uid1) REFERENCES UserFile(uid),
	FOREIGN KEY(uid2) REFERENCES UserFile(uid)
);

CREATE TABLE coolHistory (
    uid varchar(36),
    rid varchar(36),
    PRIMARY KEY(uid, rid),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid),
    FOREIGN KEY(rid) REFERENCES Review(rid)
);

CREATE TABLE Photo (
    pid VARCHAR(36) PRIMARY KEY,
    bid VARCHAR(36) REFERENCES Business(bid),
    caption VARCHAR(255),
	label VARCHAR(255) 
);


