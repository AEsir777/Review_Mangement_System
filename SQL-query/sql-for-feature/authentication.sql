DELIMITER //
CREATE PROCEDURE InsertIntoUserAuth(IN in_uid VARCHAR(36), IN in_email VARCHAR(255), IN in_pwd VARCHAR(255))
BEGIN
    INSERT INTO UserAuth (uid, email, pwd) VALUES (in_uid, in_email, in_pwd);
END //
DELIMITER ;

/* CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'password'); */

DELIMITER //
CREATE PROCEDURE InsertIntoUserAuth(IN in_uid VARCHAR(36), IN in_email VARCHAR(255), IN in_pwd VARCHAR(255))
BEGIN
    INSERT INTO UserAuth (uid, email, pwd) VALUES (in_uid, in_email, in_pwd);
END //
DELIMITER ;

/* CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'password'); */

DELIMITER //
CREATE PROCEDURE GetUserByUid(IN in_uid VARCHAR(36))
BEGIN
    SELECT * FROM UserAuth WHERE uid = in_uid;
END //
DELIMITER ;

/* CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000'); */


