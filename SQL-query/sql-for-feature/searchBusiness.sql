/* Test the part not associated with js */

DELIMITER //

CREATE PROCEDURE getAllReviewsByBid(IN input_bid INT)
BEGIN
    SELECT rid, uid
    FROM reviewwith
    WHERE bid = input_bid;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE searchBusinessBy(
    IN category VARCHAR(255),
    IN name VARCHAR(255),
    IN state VARCHAR(255),
    IN city VARCHAR(255),
    IN limit_val INT,
    IN startat_val INT
)
BEGIN
    SELECT *
    FROM business
    LEFT JOIN Photo ON business.bid = Photo.bid
    INNER JOIN location ON location.lid = business.lid
    INNER JOIN category ON category.bid = business.bid
    WHERE (name = name OR name IS NULL)
        AND (state = state OR state IS NULL)
        AND (city = city OR city IS NULL)
        AND (cate LIKE category OR category IS NULL)
    LIMIT limit_val 
    OFFSET startat_val;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE searchBusinessTotalCountBy(
    IN category VARCHAR(255),
    IN name VARCHAR(255),
    IN state VARCHAR(255),
    IN city VARCHAR(255)
)
BEGIN
    SELECT COUNT(*) AS count
    FROM business
    INNER JOIN location ON location.lid = business.lid
    INNER JOIN category ON category.bid = business.bid
    WHERE (name = name OR name IS NULL)
        AND (state = state OR state IS NULL)
        AND (city = city OR city IS NULL)
        AND (cate LIKE category OR category IS NULL);
END //

DELIMITER ;



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





DELIMITER //
CREATE PROCEDURE GetPhotoDetails(IN in_bid VARCHAR(36))
BEGIN
    SELECT pid, caption, label
    FROM Photo
    WHERE bid LIKE in_bid;
END //
DELIMITER ;


/* For Production Dataset */
ALTER TABLE Business
ADD INDEX idx_bid (bid),
ADD INDEX idx_lid (lid);

ALTER TABLE Location
ADD INDEX idx_location_lid (lid);

ALTER TABLE Category
ADD INDEX idx_category_bid (bid);

ALTER TABLE Photo
ADD INDEX idx_photo_bid (bid);

