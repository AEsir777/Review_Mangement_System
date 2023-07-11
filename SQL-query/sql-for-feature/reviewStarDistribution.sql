-- return the number of reviews for a bid in different stars group
DELIMITER //

CREATE PROCEDURE getStarDistribution(IN in_bid VARCHAR(36))
BEGIN
    SELECT SUM(CASE WHEN stars = 5 THEN 1 ELSE 0 END) AS 5_star,
     SUM(CASE WHEN stars = 4 THEN 1 ELSE 0 END) AS 4_star, 
     SUM(CASE WHEN stars = 3 THEN 1 ELSE 0 END) AS 3_star, 
     SUM(CASE WHEN stars = 2 THEN 1 ELSE 0 END) AS 2_star,
     SUM(CASE WHEN stars = 1 THEN 1 ELSE 0 END) AS 1_star,
     SUM(CASE WHEN stars = 0 THEN 1 ELSE 0 END) AS 0_star
    FROM (SELECT stars, bid FROM ReviewWith as rw JOIN Review as r
		WHERE r.rid = rw.rid) as t1
    WHERE t1.bid = in_bid;
END //

DELIMITER ;

-- e.g   star 1: 20 reviews   star 2: xx reviews then return review #


/* For Production Dataset */
ALTER TABLE Review
ADD INDEX idx_stars (stars),
ADD INDEX idx_review_rid (rid);

ALTER TABLE ReviewWith
ADD INDEX idx_reviewwith_rid (rid);
