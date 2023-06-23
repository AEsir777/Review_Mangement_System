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
/*** Test insert ******/
-- Insert a new business record
CALL InsertIntoBusiness('123e4567-e89b-12d3-a456-426614174000', -73.987, 40.757, '8AM-5PM', 1, 'Company One', '123 Main St', '10001', 5, 10, 1);

-- Verify the insertion by retrieving the business record
CALL GetBusinessByBid('123e4567-e89b-12d3-a456-426614174000');

-- Retrieve a business record by bid
CALL GetBusinessByBid('B2');
CALL GetBusinessByBid(null);

-- Search for businesses by category, name, state, and city
CALL SearchBusinessBy('Food', 'Company Four', 'TX', 'Houston');
CALL SearchBusinessBy('Retail', 'Company Two', 'NY', 'New York');
CALL SearchBusinessBy(null, null, 'NY', 'New York');
CALL SearchBusinessBy(null, null, null, 'New York');
CALL SearchBusinessBy(null, null, null, null);



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


/* get review - bid */
CALL GetReviewByBid('B2')
CALL GetReviewByBid('B9')
CALL GetReviewByBid('B7')
CALL GetReviewByBid('B100')
CALL GetReviewByBid(null)

/* update review */
CALL UpdateReviewTextByRid('R1', "update", 1);
CALL UpdateReviewTextByRid('R900', "3", 1);
CALL UpdateReviewTextByRid('R1', "update", null);


/****** cool ******/
CALL CoolByRid('R9', 'U8');
CALL CoolByRid('U1', 'R9');

/* test if a review is already cooled  */
CALL IsCool('R9', 'U8');
CALL IsCool('R1', 'U1');
CALL IsCool('R032', 'U432');





