CREATE TABLE Photo (
    pid VARCHAR(36) PRIMARY KEY,
    bid VARCHAR(36) REFERENCES Business(bid),
    caption VARCHAR(255),
	label VARCHAR(255) 
);

-- INSERT INTO Photo VALUES('B1', '-Zw9JqGQRYzkPrV_QUzMvw', 'This is a fodd', 'food');