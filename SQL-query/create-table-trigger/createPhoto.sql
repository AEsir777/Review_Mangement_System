CREATE TABLE Photo (
    pid VARCHAR(36),
    bid VARCHAR(36) REFERENCES Business(bid),
    caption VARCHAR(255),
    label VARCHAR(255),
    PRIMARY KEY (pid, bid)
);