CREATE TABLE coolHistory (
    uid varchar(36),
    rid varchar(36),
    PRIMARY (uid, rid),
    FOREIGN KEY uid UserAuth(uid),
    FOREIGN KEY rid Review(uid)
);