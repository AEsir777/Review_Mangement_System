CREATE TABLE Business (
	bid VARCHAR(36) PRIMARY KEY,
    longitude DOUBLE,
    latitude DOUBLE,
    hours VARCHAR(255),
    lid INT NOT NULL,
    name VARCHAR(255),
    address VARCHAR(255),
    postalCode VARCHAR(255),
    stars INT,
    reviewCount INT,
    isOpen INT
);





