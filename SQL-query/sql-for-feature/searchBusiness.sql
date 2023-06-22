DELIMITER //
CREATE PROCEDURE InsertIntoBusiness(IN in_bid VARCHAR(36), IN in_longitude DOUBLE, IN in_latitude DOUBLE, 
IN in_hours VARCHAR(255), IN in_lid INT, IN in_name VARCHAR(255), IN in_address VARCHAR(255), 
IN in_postalCode VARCHAR(255), IN in_stars INT, IN in_reviewCount INT, IN in_isOpen INT)
BEGIN
    INSERT INTO Business (bid, longitude, latitude, hours, lid, name, address, postalCode, stars, reviewCount, isOpen)
    VALUES (in_bid, in_longitude, in_latitude, in_hours, in_lid, in_name, in_address, in_postalCode, in_stars, in_reviewCount, in_isOpen);
END //
DELIMITER ;

/* CALL InsertIntoBusiness('123e4567-e89b-12d3-a456-426614174000', 12.34, 56.78, '9am-5pm', 1, 'Business Name', '123 Main St', '12345', 5, 100, 1); */

DELIMITER //
CREATE PROCEDURE GetBusinessByBid(IN in_bid VARCHAR(36))
BEGIN
    SELECT B.bid, B.longitude, B.latitude, B.hours, 
                                B.name, L.city, L.state, B.address, B.postalCode,
                                B.stars, B.reviewCount, B.isOpen, C.cate 
                        FROM business AS B
                        INNER JOIN location AS L ON L.lid = B.lid
                        INNER JOIN category AS C ON C.bid = B.bid
                        WHERE B.bid = in_bid;
END //
DELIMITER ;




/* CALL GetBusinessByBid('123e4567-e89b-12d3-a456-426614174000'); */

DELIMITER //
CREATE PROCEDURE `SearchBusinessBy`(IN in_category VARCHAR(255), IN in_name VARCHAR(255), IN in_state VARCHAR(255), IN in_city VARCHAR(255))
BEGIN
    DECLARE catcategory VARCHAR(255);
    
    IF in_category IS NULL THEN
        SET catcategory = NULL;
    ELSE
        SET catcategory = CONCAT('%', in_category, '%');
    END IF;
    
    SELECT *
    FROM business
    INNER JOIN location ON location.lid = business.lid
    INNER JOIN category ON category.bid = business.bid
    WHERE (name = in_name OR in_name IS NULL)
        AND (state = in_state OR in_state IS NULL)
        AND (city = in_city OR in_city IS NULL)
        AND (cate LIKE catcategory OR catcategory IS NULL);
END //
DELIMITER ;

/*  CALL SearchBusinessBy('category', 'Business Name', 'State', 'City'); */





