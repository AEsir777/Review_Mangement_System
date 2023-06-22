CREATE TRIGGER updateStar
AFTER INSERT ON Review
FOR EACH ROW
    UPDATE Business
    SET reviewCount = reviewCount + 1,
		stars = (SELECT AVG(r.stars) FROM Review as r
				 JOIN ReviewWith as rw
                 ON r.rid = rw.rid
                 WHERE bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
							  ON rw1.rid = r1.rid
                              WHERE r1.rid = NEW.rid)
				 GROUP BY bid)
    WHERE Business.bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
						  ON rw1.rid = r1.rid
						  WHERE r1.rid = NEW.rid);
                          DROP Table Review;

CREATE TRIGGER updateStar1
AFTER DELETE ON Review
FOR EACH ROW
    UPDATE Business
    SET reviewCount = reviewCount - 1,
		stars = (SELECT AVG(r.stars) FROM Review as r
				 JOIN ReviewWith as rw
                 ON r.rid = rw.rid
                 WHERE bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
							  ON rw1.rid = r1.rid
                              WHERE r1.rid = OLD.rid)
				 GROUP BY bid)
    WHERE Business.bid = (SELECT bid FROM ReviewWith as rw1 JOIN Review as r1
						  ON rw1.rid = r1.rid
						  WHERE r1.rid = OLD.rid);
                          DROP Table Review;

INSERT INTO `business` (`bid`, `longitude`, `latitude`, `hours`, `lid`, `name`, `address`, `postalCode`, `stars`, `reviewCount`, `isOpen`) VALUES ('CF33F8-E6oudUQ46HnavjQ', -87.058943, 36.269593, '{\"Monday\":\"0:0-0:0\",\"Tuesday\":\"6:0-22:0\",\"Wednesday\":\"6:0-22:0\",\"Thursday\":\"6:0-22:0\",\"Friday\":\"9:0-0:0\",\"Saturday\":\"9:0-22:0\",\"Sunday\":\"8:0-22:0\"}', 4, 'Sonic Drive-In', '615 S Main St', '37015\r\n', 1, 1, 1);
INSERT INTO `business` (`bid`, `longitude`, `latitude`, `hours`, `lid`, `name`, `address`, `postalCode`, `stars`, `reviewCount`, `isOpen`) VALUES ('k0hlBqXX-Bt0vf1op7Jr1w', -90.3210868, 38.5651648, '', 5, 'Tsevi\'s Pub And Grill', '8025 Mackenzie Rd', '63123\r\n', 2, 0, 1);   
INSERT INTO UserAuth(uid, email, pwd) VALUES('123', 'IIGZYII@hotmail.com', '12345'); 
INSERT INTO ReviewWith (bid, uid, rid) VALUES('CF33F8-E6oudUQ46HnavjQ', '123','2'); 
INSERT INTO Review (rid, date, text, stars, cool) VALUES('2', '2002-08-08','test',5,0);
INSERT INTO ReviewWith (bid, uid, rid) VALUES('CF33F8-E6oudUQ46HnavjQ', '123','3'); 
INSERT INTO Review (rid, date, text, stars, cool) VALUES('3', '2002-08-08','test',5,0);
INSERT INTO ReviewWith (bid, uid, rid) VALUES('CF33F8-E6oudUQ46HnavjQ', '123','4'); 
INSERT INTO Review (rid, date, text, stars, cool) VALUES('4', '2002-08-08','test',0,0);
INSERT INTO ReviewWith (bid, uid, rid) VALUES('CF33F8-E6oudUQ46HnavjQ', '123','5'); 
INSERT INTO Review (rid, date, text, stars, cool) VALUES('5', '2002-08-08','test',0,0);
INSERT INTO ReviewWith (bid, uid, rid) VALUES('CF33F8-E6oudUQ46HnavjQ', '123','6'); 
INSERT INTO Review (rid, date, text, stars, cool) VALUES('6', '2002-08-08','test',1,0);
SELECT * FROM business;