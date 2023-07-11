/* function main part is implemented in javascript */
DELIMITER //
CREATE PROCEDURE InsertIntoUserAuth(IN in_uid VARCHAR(36), IN in_email VARCHAR(255), IN in_pwd VARCHAR(255))
BEGIN
    INSERT INTO UserAuth (uid, email, pwd) VALUES (in_uid, in_email, in_pwd);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE GetUserByUid(IN in_uid VARCHAR(36))
BEGIN
    SELECT * FROM UserAuth WHERE uid = in_uid;
END //
DELIMITER ;

ALTER TABLE UserAuth
ADD INDEX idx_uid (uid),
ADD INDEX idx_email (email);

