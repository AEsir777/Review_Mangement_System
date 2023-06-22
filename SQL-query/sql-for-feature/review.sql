DELIMITER //
CREATE PROCEDURE GetReviewsByBid(IN in_bid VARCHAR(36))
BEGIN
    SELECT text
    FROM 
    (SELECT rid
    FROM reviewwith
    WHERE bid LIKE in_bid) AS r1
    INNER JOIN review
    ON review.rid = r1.rid;
END //
DELIMITER ;

/* CALL GetReviewsByBusinessId('123e4567-e89b-12d3-a456-426614174000'); */

DELIMITER //
CREATE PROCEDURE GetReviewByRid(IN in_rid VARCHAR(36))
BEGIN
    SELECT * FROM Review WHERE rid = in_rid;
END //
DELIMITER ;

/* CALL GetReviewByRid('123e4567-e89b-12d3-a456-426614174000'); */


DELIMITER //
CREATE PROCEDURE UpdateReviewTextByRid(IN in_rid VARCHAR(36), IN in_text VARCHAR(255), IN in_stars INT)
BEGIN
    UPDATE Review 
    SET text = in_text, stars = in_stars 
    WHERE rid = in_rid;
END //
DELIMITER ;

/* CALL UpdateReviewTextByRid('123e4567-e89b-12d3-a456-426614174000', 'New text', 5); */


