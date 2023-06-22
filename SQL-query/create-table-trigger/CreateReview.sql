CREATE TABLE Review (
    rid VARCHAR(36) PRIMARY KEY,
    date TIMESTAMP,
	text VARCHAR(255),
    stars INT,
    cool INT
);