--- return the number of reviews for a bid in different stars group
DELIMITER //

CREATE PROCEDURE getStarDistribution(IN in_bid VARCHAR(36))
BEGIN
    SELECT SUM(CASE WHEN star = 5 THEN 1 ELSE 0 END) AS 5_star,
     SUM(CASE WHEN star = 4 THEN 1 ELSE 0 END) AS 4_star, 
     SUM(CASE WHEN star = 3 THEN 1 ELSE 0 END) AS 3_star, 
     SUM(CASE WHEN star = 2 THEN 1 ELSE 0 END) AS 2_star,
     SUM(CASE WHEN star = 1 THEN 1 ELSE 0 END) AS 1_star,
     SUM(CASE WHEN star = 0 THEN 1 ELSE 0 END) AS 0_star,
    FROM Business
    WHERE bid = in_bid;
END //

DELIMITER ;
---- e.g   star 1: 20 reviews   star 2: xx reviews then return review #