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