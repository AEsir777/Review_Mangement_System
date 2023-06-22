CREATE TABLE Business (
	bid VARCHAR(36) PRIMARY KEY,
    longitude DOUBLE,
    latitude DOUBLE,
    hours VARCHAR(255),
    lid INT,
    name VARCHAR(255),
    address VARCHAR(255),
    postalCode VARCHAR(255),
    stars INT,
    reviewCount INT,
    isOpen INT
);

CREATE TABLE Category (
    bid VARCHAR(36),
    cate VARCHAR(255),
    FOREIGN KEY (bid) REFERENCES Business(bid)
);

CREATE TABLE ReviewWith (
    bid VARCHAR(36) NOT NULL,
    uid VARCHAR(36) NOT NULL,
	rid VARCHAR(36) NOT NULL
);

CREATE TABLE Location (
    lid INT PRIMARY KEY,
    city VARCHAR(255),
	state VARCHAR(255)
);

--for test only
CREATE TABLE Review (
    rid VARCHAR(36) PRIMARY KEY,
    date TIMESTAMP,
	text VARCHAR(255),
    stars INT,
    cool INT
);
