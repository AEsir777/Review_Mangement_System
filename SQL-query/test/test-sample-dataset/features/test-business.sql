/****** searchBusiness ******/
/*** Test insert ******/
-- Insert a new business record
CALL InsertIntoBusiness('123e4567-e89b-12d3-a456-426614174000', -73.987, 40.757, '8AM-5PM', 1, 'Company One', '123 Main St', '10001', NULL, 0, 1);

-- Verify the insertion by retrieving the business record
CALL GetBusinessByBid('123e4567-e89b-12d3-a456-426614174000');

-- Retrieve a business record by bid
-- Check review count and star
CALL GetBusinessByBid('B1');
CALL GetBusinessByBid('B2');
CALL GetBusinessByBid('B3');
CALL GetBusinessByBid(null);

-- Search for businesses by category, name, state, and city
CALL SearchBusinessBy('Food', 'Company Four', 'TX', 'Houston');
CALL SearchBusinessBy('Retail', 'Company Two', 'NY', 'New York');
CALL SearchBusinessBy(null, null, 'NY', 'New York');
CALL SearchBusinessBy(null, null, null, 'New York');
CALL SearchBusinessBy(null, null, null, null);
CALL SearchBusinessBy('Telecommunications', null, null, null);
CALL SearchBusinessBy(NULL, null, 'TX', null);
CALL SearchBusinessBy('Telecommunications', null, null, 'New York');

/* photos */
CALL GetPhotoDetails ('B1');
CALL GetPhotoDetails ('B3');
CALL GetPhotoDetails (null);
CALL GetPhotoDetails ('B4');