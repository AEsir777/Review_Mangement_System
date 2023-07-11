DELIMITER //
CREATE PROCEDURE CoolByRid(IN in_rid VARCHAR(36), IN in_uid VARCHAR(36))
BEGIN
    INSERT INTO CoolHistory (uid, rid) 
    VALUES (in_uid, in_rid);
END //
DELIMITER ;


/* CALL CoolByRid('123e4567-e89b-12d3-a456-426614174000', '456e789b-12d3-a123-4566-789b12d3a456'); */

DELIMITER //
CREATE PROCEDURE IsCool(IN in_rid VARCHAR(36), IN in_uid VARCHAR(36))
BEGIN
    SELECT * FROM CoolHistory
    WHERE uid = in_uid AND rid = in_rid;
END //
DELIMITER ;


/* CALL IsCool('123e4567-e89b-12d3-a456-426614174000', '456e789b-12d3-a123-4566-789b12d3a456'); */

-- TODO: NOT TESTED
DELIMITER //

CREATE PROCEDURE cancelCool(IN in_rid VARCHAR(36), IN in_uid VARCHAR(36))
BEGIN
    DELETE FROM CoolHistory where rid = in_rid AND uid = in_uid;
END //

DELIMITER ;

DELETE FROM CoolHistory where rid = ? AND uid = ?;

ALTER TABLE CoolHistory
ADD INDEX idx_uid_rid (uid, rid);
