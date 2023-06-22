CREATE TABLE coolHistory (
    uid varchar(36),
    rid varchar(36),
    PRIMARY KEY(uid, rid),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid),
    FOREIGN KEY(rid) REFERENCES Review(rid)
);
