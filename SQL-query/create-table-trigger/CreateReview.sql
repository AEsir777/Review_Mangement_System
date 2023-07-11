CREATE TABLE Review (
    rid VARCHAR(36) PRIMARY KEY,
    date DATE NOT NULL,
	text LONGTEXT,
    stars INT NOT NULL,
    cool INT NOT NULL
);