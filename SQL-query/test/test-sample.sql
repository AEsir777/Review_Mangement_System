/**** authentication ******/
/*** Test insert (mostly already tested when inserting into) ******/
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'password');

/*** Test get user ***/
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000');
CALL GetUserByUid('U1');
CALL GetUserByUid('U9');
CALL GetUserByUid('U10');
CALL GetUserByUid('U300');


/****** searchBusiness ******/
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


/****** review ******/
/*** Test the insertion feature ***/
CALL LeaveReview('B2', 'U1', 'This is a great business.');
CALL LeaveReview('B5', 'U9', 'This is a great business x2.');
CALL LeaveReview('B9', 'U1', null);

/* fail cases - should not be able to add */
CALL LeaveReview('B5', 'U200', 'This is a great business x3.');
CALL LeaveReview(null, 'U1', 'This is a great business x3.');


/* get review - start with RID */
CALL GetReviewByRid('9LBkzSDXtbD8j9K6GvYufQ')
CALL GetReviewByRid('R5')
CALL GetReviewByRid('R023')
CALL GetReviewByRid(null)

CALL GetReviewByBid('B7')


CALL UpdateReviewTextByRid(1, "3", 1);
CALL UpdateReviewTextByRid('R900', "3", 1);


// cool
CALL CoolByRid('R9', 'U8');
CALL CoolByRid('U1', 'U9');

CALL IsCool('R9', 'U8');
CALL IsCool('R1', 'U1');
CALL IsCool('R032', 'U432');





