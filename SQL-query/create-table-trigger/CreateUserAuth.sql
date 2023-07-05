CREATE TABLE UserAuth (
    uid varchar(36) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    pwd varchar(255) NOT NULL,
    PRIMARY KEY (uid)
);