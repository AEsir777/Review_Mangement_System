CREATE TABLE Business (
	bid VARCHAR(36) PRIMARY KEY,
    longitude DOUBLE NOT NULL,
    latitude DOUBLE NOT NULL,
    hours VARCHAR(255) NOT NULL,
    lid INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postalCode VARCHAR(255) NOT NULL,
    stars INT,
    reviewCount INT NOT NULL,
    isOpen INT NOT NULL
);





