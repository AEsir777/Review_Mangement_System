USE CS348;

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

CREATE TABLE Category (
    bid VARCHAR(36),
    cate VARCHAR(255),
    FOREIGN KEY (bid) REFERENCES Business(bid),
    PRIMARY KEY (bid, cate)
);


CREATE TABLE UserAuth (
    uid varchar(36) NOT NULL,
    email varchar(255) NOT NULL,
    pwd varchar(255) NOT NULL,
    PRIMARY KEY (uid)
);


CREATE TABLE Review (
    rid VARCHAR(36) PRIMARY KEY,
    date TIMESTAMP NOT NULL,
	text VARCHAR(255),
    stars INT NOT NULL,
    cool INT NOT NULL
);


CREATE TABLE coolHistory (
    uid varchar(36),
    rid varchar(36),
    PRIMARY KEY(uid, rid),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid),
    FOREIGN KEY(rid) REFERENCES Review(rid)
);


CREATE TABLE UserFile (
	uid varchar(36),
	name varchar(255) NOT NULL,
    createTime TIMESTAMP NOT NULL,
    cools INT NOT NULL,
    reviewCount INT NOT NULL,
	PRIMARY KEY(uid, name),
    FOREIGN KEY(uid) REFERENCES UserAuth(uid) ON DELETE CASCADE
);

CREATE TABLE ReviewWith (
    bid VARCHAR(36) NOT NULL,
    uid VARCHAR(36) NOT NULL,
	rid VARCHAR(36) NOT NULL,
	FOREIGN KEY (bid) REFERENCES Business(bid),
	FOREIGN KEY (uid) REFERENCES UserFile(uid)
);

CREATE TABLE Location (
    lid INT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL
);

CREATE TABLE Friend (
	uid1 varchar(36) NOT NULL,
	uid2 varchar(36) NOT NULL,
	PRIMARY KEY(uid1, uid2),
	FOREIGN KEY(uid1) REFERENCES UserFile(uid) ON DELETE CASCADE,
	FOREIGN KEY(uid2) REFERENCES UserFile(uid) ON DELETE CASCADE
);

CREATE TABLE Photo (
    pid VARCHAR(36),
    bid VARCHAR(36) REFERENCES Business(bid),
    caption VARCHAR(255),
    label VARCHAR(255),
    PRIMARY KEY (pid, bid)
);

DROP TRIGGER updateStar;

CREATE TRIGGER updateStar
AFTER INSERT ON Review
FOR EACH ROW
    UPDATE Business
    SET stars = (SELECT AVG(r.stars) FROM Review as r
				 JOIN ReviewWith as rw
                 ON r.rid = rw.rid
                 WHERE bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
							  ON rw1.rid = r1.rid
                              WHERE r1.rid = NEW.rid)
				 GROUP BY bid)
    WHERE Business.bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
						  ON rw1.rid = r1.rid
						  WHERE r1.rid = NEW.rid);

CREATE TRIGGER updateStar1
BEFORE DELETE ON Review
FOR EACH ROW
    UPDATE Business
    SET reviewCount = reviewCount - 1,
		stars = (SELECT AVG(r.stars) FROM Review as r
				 JOIN ReviewWith as rw
                 ON r.rid = rw.rid
                 WHERE bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
							  ON rw1.rid = r1.rid
                              WHERE r1.rid = OLD.rid)
				AND r.rid != OLD.rid)
    WHERE Business.bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
						  ON rw1.rid = r1.rid
						  WHERE r1.rid = OLD.rid);
              
CREATE TRIGGER updateStar2
AFTER UPDATE ON Review
FOR EACH ROW
    UPDATE Business
    SET stars = (SELECT AVG(r.stars) FROM Review as r
				 JOIN ReviewWith as rw
                 ON r.rid = rw.rid
                 WHERE bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
							  ON rw1.rid = r1.rid
                              WHERE r1.rid = NEW.rid)
				 GROUP BY bid)
    WHERE Business.bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
						  ON rw1.rid = r1.rid
						  WHERE r1.rid = NEW.rid);

CREATE TRIGGER addCool
AFTER INSERT ON coolHistory
FOR EACH ROW
    UPDATE review
    SET cool = cool + 1
    WHERE review.rid = NEW.rid;

CREATE TRIGGER subCool
BEFORE DELETE ON coolHistory
FOR EACH ROW
    UPDATE review
    SET cool = cool - 1
    WHERE review.rid = OLD.rid;

CREATE TRIGGER addCools
AFTER INSERT ON coolHistory
FOR EACH ROW
    UPDATE UserFile
    SET cools = cools + 1
    WHERE UserFile.uid = NEW.uid;

CREATE TRIGGER subCools
BEFORE DELETE ON coolHistory
FOR EACH ROW
    UPDATE UserFile
    SET cools = cools - 1
    WHERE UserFile.uid = OLD.uid;

INSERT INTO Business VALUES
('B1', -73.987, 40.757, '8AM-5PM', 1, 'Company One', '123 Main St', '10001', 5, 10, 1),
('B2', -74.005, 40.712, '9AM-6PM', 2, 'Company Two', '456 Elm St', '10002', 4, 20, 1),
('B3', -73.973, 40.763, '8AM-4PM', 3, 'Company Three', '789 Pine St', '10003', 3, 15, 0),
('B4', -73.982, 40.744, '10AM-8PM', 4, 'Company Four', '321 Oak St', '10004', 2, 30, 1),
('B5', -73.989, 40.748, '9AM-7PM', 5, 'Company Five', '654 Cedar St', '10005', 1, 25, 0),
('B6', -213.22, -3.234, '9AM-5PM', 6, 'Company Six', '321 Banana St', '10006', 5, 30, 1),
('B7', -73.955, 40.717, '10AM-9:30PM', 7, 'Company Seven', '987 Maple St', '10007', 4, 35, 0),
('B8', -73.987, 40.757, '8AM-5PM', 8, 'Company Eight', '123 Cherry St', '10008', 3, 40, 1),
('B9', -74.005, 40.712, '9AM-6PM', 9, 'Company Nine', '456 Oak St', '10009', 2, 45, 0),
('B10', -73.973, 40.763, '8AM-4PM', 10, 'Company Ten', '450 Oak St', '10010', 1, 50, 1),
('B11', -73.982, 40.744, '10AM-8PM', 11, 'Company Eleven', '321 Willow St', '10011', 5, 55, 0),
('B12', -73.989, 40.748, '9AM-7PM', 12, 'Company Twelve', '654 Pine St', 'CK2F9J', 4, 60, 1),
('B13', -73.987, 40.757, '8AM-5PM', 13, 'Company Thirteen', '123 Apple St', '10013', 0, 65, 0),
('B14', -74.005, 40.712, '9AM-6PM', 14, 'Company Fourteen', '456 Elm St', '10014', 2, 0, 1),
('B15', -73.973, 40.763, '8AM-4PM', 15, 'Company Fifteen', '789 Peach St', '10015', NULL, 75, 0),
('B16', -73.982, 40.744, '10AM-8PM', 16, 'Company Sixteen', '321 Cherry St', '10016', 5, 80, 1),
('B17', -73.989, 40.748, '9AM-7PM', 17, 'Company Seventeen', '654 Pear St', '10017', 4, 85, 0),
('B18', -73.987, 40.757, '8AM-5PM', 18, 'Company Eighteen', '123 Apple St', '10018', 3, 90, 1),
('B19', -74.005, 40.712, '9AM-6PM', 19, 'Company Nineteen', '456 Elm St', '10019', 2, 95, 0),
('B20', -73.973, 40.763, '8AM-4PM', 20, 'Company Twenty', '789 Pine St', '10020', 1, 100, 1);

INSERT INTO Category VALUES
('B1', 'Retail'),
('B2', 'Technology'),
('B3', 'Healthcare'),
('B4', 'Food'),
('B5', 'Automotive'),
('B6', 'Fashion'),
('B7', 'Real Estate'),
('B8', 'Education'),
('B9', 'Hospitality'),
('B10', 'Financial Services; Hospitality; Manufacturing; Automotive; Education; Fashion'),
('B11', 'Automobile'),
('B12', 'Telecommunications'),
('B13', 'Construction'),
('B14', 'Manufacturing'),
('B15', 'Transportation'),
('B16', 'Wholesale'),
('B17', 'Agriculture'),
('B18', 'Pharmaceuticals'),
('B19', 'Energy'),
('B20', 'Mining');

INSERT INTO UserAuth VALUES
('U1', 'user1@example.com', 'HASHED_PASSWORD_1'),
('U2', 'user2@example.com', 'HASHED_PASSWORD_2'),
('U3', 'user3@example.com', 'HASHED_PASSWORD_3'),
('U4', 'user4@example.com', 'HASHED_PASSWORD_4'),
('U5', 'user5@example.com', 'HASHED_PASSWORD_5'),
('U6', 'user6@example.com', 'HASHED_PASSWORD_6'),
('U7', 'user7@example.com', 'HASHED_PASSWORD_7'),
('U8', 'user8@example.com', 'HASHED_PASSWORD_8'),
('U9', 'user9@example.com', 'HASHED_PASSWORD_9'),
('U10', 'user10@example.com', 'HASHED_PASSWORD_10'),
('U11', 'user11@example.com', 'HASHED_PASSWORD_11'),
('U12', 'user12@example.com', 'HASHED_PASSWORD_12'),
('U13', 'user13@example.com', 'HASHED_PASSWORD_13'),
('U14', 'user14@example.com', 'HASHED_PASSWORD_14'),
('U15', 'user15@example.com', 'HASHED_PASSWORD_15'),
('U16', 'user16@example.com', 'HASHED_PASSWORD_16'),
('U17', 'user17@example.com', 'HASHED_PASSWORD_17'),
('U18', 'user18@example.com', 'HASHED_PASSWORD_18'),
('U19', 'user19@example.com', 'HASHED_PASSWORD_19'),
('U20', 'user20@example.com', 'HASHED_PASSWORD_20');


INSERT INTO UserFile VALUES
('U1', 'User One', '2023-01-02 13:00:00', 10, 20),
('U2', 'User Two', '2023-01-02 13:00:00', 43, 25),
('U3', 'User Three', '2023-01-03 14:00:00', 20, 43),
('U4', 'User Four', '2023-01-04 15:00:00', 24, 43),
('U5', 'User Five', '2023-01-05 16:00:00', 30, 40),
('U6', 'User Six', '2023-01-06 17:00:00', 35, 45),
('U7', 'User Seven', '2023-01-07 18:00:00', 40, 50),
('U8', 'User Eight', '2023-01-08 19:00:00', 45, 55),
('U9', 'User Nine', '2023-01-09 20:00:00', 50, 60),
('U10', 'User Ten', '2023-01-10 21:00:00', 55, 65),
('U11', 'User Eleven', '2023-01-11 22:00:00', 60, 70),
('U12', 'User Twelve', '2023-01-12 23:00:00', 65, 75),
('U13', 'User Thirteen', '2023-01-13 00:00:00', 70, 80),
('U14', 'User Fourteen', '2023-01-14 01:00:00', 75, 85),
('U15', 'User Fifteen', '2023-01-15 02:00:00', 80, 90),
('U16', 'User Sixteen', '2023-01-16 03:00:00', 85, 95),
('U17', 'User Seventeen', '2023-01-17 04:00:00', 90, 100),
('U18', 'User Eighteen', '2023-01-18 05:00:00', 95, 105),
('U19', 'User Nineteen', '2023-01-19 06:00:00', 100, 110),
('U20', 'User Twenty', '2023-01-20 07:00:00', 105, 115); 

CREATE TRIGGER addUser
AFTER INSERT ON UserAuth
FOR EACH ROW
	INSERT INTO UserFile(uid, name, createTime, reviewCount, cools) 
    VALUES(NEW.uid, NEW.email, NOW(), 0, 0);

INSERT INTO ReviewWith VALUES
('B1', 'U1', 'R1'),
('B1', 'U2', 'R2'),
('B2', 'U3', 'R3'),
('B2', 'U4', 'R4'),
('B2', 'U5', 'R5'),
('B3', 'U1', 'R6'),
('B3', 'U2', 'R7'),
('B3', 'U3', 'R8'),
('B4', 'U4', 'R9'),
('B4', 'U5', 'R10'),
('B5', 'U1', 'R11'),
('B5', 'U2', 'R12'),
('B1', 'U3', 'R13'),
('B1', 'U4', 'R14'),
('B2', 'U5', 'R15'),
('B2', 'U1', 'R16'),
('B3', 'U2', 'R17'),
('B3', 'U3', 'R18'),
('B4', 'U4', 'R19'),
('B4', 'U5', 'R20');

INSERT INTO Review VALUES
('R1', '2023-01-01 12:00:00', 'Great service and friendly staff.', 5, 10),
('R2', '2023-01-02 13:00:00', 'Quality product, will buy again.', 4, 8),
('R3', '2023-01-03 14:00:00', 'The product broke after a few days.', 1, 1),
('R4', '2023-01-04 15:00:00', 'The service was terrible.', 2, 0),
('R5', '2023-01-05 16:00:00', 'Really enjoy the food here.', 5, 9),
('R6', '2023-01-06 17:00:00', 'Best place in town.', 5, 10),
('R7', '2023-01-07 18:00:00', 'Friendly staff but slow service.', 3, 5),
('R8', '2023-01-08 19:00:00', 'Not worth the price.', 2, 2),
('R9', '2023-01-09 20:00:00', 'The food is bland.', 2, 3),
('R10', '2023-01-10 21:00:00', 'Would not recommend.', 1, 1),
('R11', '2023-01-11 22:00:00', 'Excellent quality!', 5, 8),
('R12', '2023-01-12 23:00:00', 'Great atmosphere and good service.', 4, 7),
('R13', '2023-01-13 00:00:00', '', 4, 6),
('R14', '2023-01-14 01:00:00', 'Great customer service but expensive.', 3, 4),
('R15', '2023-01-15 02:00:00', 'The food was not fresh.', 2, 3),
('R16', '2023-01-16 03:00:00', 'The place is not clean.', 1, 2),
('R17', '2023-01-17 04:00:00', 'The staff was very helpful.', 4, 6),
('R18', '2023-01-18 05:00:00', 'The food was cold when served.', 2, 4),
('R19', '2023-01-19 06:00:00', 'The service was slow.', 2, 3),
('R20', '2023-01-20 07:00:00', 'The staff was rude.', 1, 1),
('R21', '2023-01-18 05:00:00', 'Two reviews made by same user is okay.', 2, 4),
('R22', '2023-01-19 06:00:00', '', 2, 4);


INSERT INTO Location VALUES
(1, 'New York', 'NY'),
(2, 'Los Angeles', 'CA'),
(3, 'Chicago', 'IL'),
(4, 'Houston', 'TX'),
(5, 'Philadelphia', 'PA'),
(6, 'Phoenix', 'AZ'),
(7, 'San Antonio', 'TX'),
(8, 'San Diego', 'CA'),
(9, 'Dallas', 'TX'),
(10, 'San Jose', 'CA'),
(11, 'Austin', 'TX'),
(12, 'Miami', 'FL'),
(13, 'Columbus', 'PK'),
(14, 'Fort Worth', 'TX'),
(15, 'Indianapolis', 'IN'),
(16, 'Charlotte', 'NC'),
(17, 'Seattle', 'WA'),
(18, 'Denver', 'CO'),
(19, 'El Paso', 'TX'),
(20, 'Detroit', 'MI');

INSERT INTO coolHistory VALUES
('U1', 'R1'),
('U2', 'R2'),
('U3', 'R3'),
('U4', 'R4'),
('U5', 'R5'),
('U6', 'R6'),
('U7', 'R7'),
('U8', 'R8'),
('U9', 'R9'),
('U10', 'R10'),
('U11', 'R11'),
('U12', 'R12'),
('U13', 'R13'),
('U14', 'R14'),
('U15', 'R15'),
('U16', 'R16'),
('U17', 'R17'),
('U18', 'R18'),
('U19', 'R19'),
('U20', 'R20'),
('U18', 'R1'),
('U19', 'R3'),
('U20', 'R4');

INSERT INTO Friend VALUES
('U1', 'U2'),
('U1', 'U3'),
('U1', 'U4'),
('U1', 'U5'),
('U2', 'U1'),
('U2', 'U3'),
('U2', 'U4'),
('U3', 'U1'),
('U3', 'U2'),
('U3', 'U5'),
('U4', 'U1'),
('U4', 'U2'),
('U4', 'U5'),
('U5', 'U1'),
('U5', 'U3'),
('U5', 'U4'),
('U6', 'U7'),
('U6', 'U8'),
('U7', 'U8'),
('U8', 'U7');


INSERT INTO Photo VALUES
('zsvj7vloL4L5jhYyPIuVwg', 'B1', 'Nice rock artwork everywhere and craploads of taps.', 'inside'),
('Kw4cqVChYxm4mSxAimHiNA', 'B2', 'Inside seating', 'inside'),
('ZFnOsg5eUciav5ltpxbxPA', 'B3', 'Look at the size of this sandwich !', 'food'),
('_1fqxF5C0e5YHk5-CRc8cg', 'B4', null, 'inside'),
('jbiMLg7IZkq_l_k3nIMH0A','B5','Outside','inside');


