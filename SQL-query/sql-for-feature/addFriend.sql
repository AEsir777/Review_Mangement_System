
DELIMITER //
CREATE PROCEDURE InsertFriend(IN in_uid1 VARCHAR(36), IN in_uid2 VARCHAR(36))
BEGIN
    INSERT INTO Friend (uid1, uid2)
    VALUES (in_uid1, in_uid2);
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE CheckFriendship(IN in_uid1 VARCHAR(36), IN in_uid2 VARCHAR(36))
BEGIN
    SELECT *
    FROM Friend
    WHERE (uid1 = in_uid1 AND uid2 = in_uid2) OR (uid2 = in_uid1 AND uid1 = in_uid2);
END //
DELIMITER ;

ALTER TABLE Friend
ADD INDEX idx_uids (uid1, uid2);
