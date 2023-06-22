CREATE TABLE Category (
    bid VARCHAR(36),
    cate VARCHAR(255),
    FOREIGN KEY (bid) REFERENCES Business(bid)
);
