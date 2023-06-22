// authentication

CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'password');

CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000');

CALL GetUserByUid('U10');


// searchBusiness
-- Insert a new business record
CALL InsertIntoBusiness('123e4567-e89b-12d3-a456-426614174000', -73.987, 40.757, '8AM-5PM', 1, 'Company One', '123 Main St', '10001', 5, 10, 1);

-- Verify the insertion by retrieving the business record
CALL GetBusinessByBid('123e4567-e89b-12d3-a456-426614174000');

-- Retrieve a business record by bid
CALL GetBusinessByBid('B2');

-- Search for businesses by category, name, state, and city
CALL SearchBusinessBy('Food', 'Company Four', 'TX', 'Houston');
-- Search for businesses by category and state
CALL SearchBusinessBy('Retail', 'Company Two', 'NY', 'New York');


// review
CALL LeaveReview('B2', 'U1', 'This is a great business.');
CALL LeaveReview('B5', 'U9', 'This is a great business x2.');

CALL GetReviewByBid('B2')
CALL GetReviewByBid('B7')

CALL GetReviewByRid('R5')
CALL GetReviewByRid('R023')

CALL UpdateReviewTextByRid(1, "3", 1);
CALL UpdateReviewTextByRid('R900', "3", 1);


// cool
CALL CoolByRid('R9', 'U8');
CALL CoolByRid('U1', 'U9');

CALL IsCool('R9', 'U8');
CALL IsCool('R1', 'U1');
CALL IsCool('R032', 'U432');





