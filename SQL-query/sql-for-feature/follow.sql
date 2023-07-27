
DELIMITER //
CREATE PROCEDURE InsertFriend(IN in_uid1 VARCHAR(36), IN in_uid2 VARCHAR(36))
BEGIN
    INSERT INTO Friend (uid1, uid2)
    VALUES (in_uid1, in_uid2);
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE GetFollowers(IN userid VARCHAR(36))
BEGIN
    SELECT tmp.uid1, userfile.name
                    FROM
                    (SELECT uid1 FROM Friend
                    WHERE uid2 = userid) tmp
                    INNER JOIN userfile ON userfile.uid = tmp.uid1;
END //
DELIMITER ;

/* For Production Dataset */
ALTER TABLE Friend
ADD INDEX idx_uids (uid1, uid2);

DELIMITER //
CREATE PROCEDURE GetFollowings(IN userid VARCHAR(36))
BEGIN
    SELECT tmp.uid2, userfile.name
                    FROM
                    (SELECT uid2 FROM Friend
                    WHERE uid1 = userid) tmp
                    INNER JOIN userfile ON userfile.uid = tmp.uid2;
END //
DELIMITER ;