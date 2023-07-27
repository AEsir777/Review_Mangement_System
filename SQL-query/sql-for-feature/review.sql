/* tested features - convereted javascript code to sql  */
DELIMITER //

CREATE PROCEDURE LeaveReview(
    IN bid INT,
    IN uid INT,
    IN rid INT,
    IN text VARCHAR(255),
    IN stars INT
)
BEGIN
    -- First query to insert into reviewwith table
    INSERT INTO reviewwith (bid, uid, rid)
    VALUES (bid, uid, rid);
    
    -- Second query to insert into review table
    INSERT INTO review (rid, date, text, stars, cool)
    VALUES (rid, NOW(), text, stars, 0);
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE GetReviewByBid(IN in_bid VARCHAR(36))
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

-- TODO: test 
DELIMITER //

CREATE PROCEDURE GetReviewDetails(IN in_rid VARCHAR(36))
BEGIN
    SELECT rid, date, text, stars, cool, name, uid
    FROM Review 
    NATURAL JOIN ReviewWith
    NATURAL JOIN UserFile
    WHERE rid = in_rid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE getRidByBid(IN in_bid VARCHAR(36))
BEGIN
    SELECT rid
    FROM ReviewWith
    WHERE bid LIKE in_bid;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE DeleteReview(IN in_rid VARCHAR(36))
BEGIN
    DELETE FROM ReviewWith WHERE rid = in_rid;
    DELETE FROM CoolHistory WHERE rid = in_rid;
    DELETE FROM Review WHERE rid = in_rid;
END //
DELIMITER ;



/* For Production Dataset */
ALTER TABLE Review
ADD INDEX idx_rid (rid);

ALTER TABLE ReviewWith
ADD INDEX idx_reviewwith_rid (rid),
ADD INDEX idx_reviewwith_bid (bid);

ALTER TABLE CoolHistory
ADD INDEX idx_coolhistory_rid (rid);

ALTER TABLE UserFile
ADD INDEX idx_userfile_uid (uid);

