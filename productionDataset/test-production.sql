/**** add friend ******/
/*** Test insert and isFriend ******/
-- check: not exist before
CALL CheckFriendship('"rppTTi-kfF8-qyiArNemag"
', '"HzoQKKHDq9BI37dyJAAtGA"
');
-- success case
CALL InsertFriend('"rppTTi-kfF8-qyiArNemag"
', '"RgDVC3ZUBqpEe6Y1kPhIpw"
');
-- check
CALL CheckFriendship('"rppTTi-kfF8-qyiArNemag"', '"RgDVC3ZUBqpEe6Y1kPhIpw"');

-- check: exist before
CALL CheckFriendship('"LwZJFLGxQwjjeOgpqTJnfw"
', '"RHsmgIvCfnFL7DPNptKY8A"
');
CALL CheckFriendship('"c7XI431TnC9_AkmC-qrXvQ"
', '"RgDVC3ZUBqpEe6Y1kPhIpw"
');
CALL CheckFriendship('"w-zD8Ln3XZszM82AfVrspg"
', '"RgDVC3ZUBqpEe6Y1kPhIpw"
');

-- check: insert fail
CALL InsertFriend('"LwZJFLGxQwjjeOgpqTJnfw"', '"RHsmgIvCfnFL7DPNptKY8A"');
CALL InsertFriend('"LwZJFLGxQwjjeOgpqTJnfw"', '"abcd"');









/**** authentication ******/
/*** Test insert (mostly already tested when inserting into) ******/
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'password');

/*** Test get user ***/
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000');
CALL GetUserByUid('U1');
CALL GetUserByUid('U8');
CALL GetUserByUid('U9');
CALL GetUserByUid('U10');
CALL GetUserByUid('U300');










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












/****** cool ******/
CALL CoolByRid('R9', 'U8');
CALL CoolByRid('U1', 'R9');
CALL CoolByRid('R1', 'U8');
CALL CoolByRid('R1', 'R9');
CALL CoolByRid('R1', 'U1');
CALL CoolByRid('R3', 'R1');

/* test if a review is already cooled  */
CALL IsCool('R9', 'U8');
CALL IsCool('R1', 'U1');
CALL IsCool('R032', 'U432');
CALL IsCool(null, 'U3');

/* test if cools added in user profile */
CALL GetUserByUid('U1');
CALL GetUserByUid('U8');

/* cancel cool */
CALL cancelCool('R9', 'U8')
CALL cancelCool('R1', 'U1')
CALL cancelCool('R3', 'U1')

/* test if cools in user profile update after cool got cancelled*/
CALL GetUserByUid('U1');
CALL GetUserByUid('U8');












/****** review ******/
/*** Test the insertion feature ***/
CALL LeaveReview('B2', 'U1', 'This is a great business.');
CALL LeaveReview('B5', 'U9', 'This is a great business x2.');
CALL LeaveReview('B9', 'U1', null);

/* fail cases - should not be able to add */
CALL LeaveReview('B5', 'U200', 'This is a great business x3.');
CALL LeaveReview(null, 'U1', 'This is a great business x3.');
CALL LeaveReview('B2', 'U1', 'This is a great business x3.');


/* get review - start with RID */
CALL GetReviewByRid('9LBkzSDXtbD8j9K6GvYufQ');
CALL GetReviewByRid('R5');
CALL GetReviewByRid('R023');
CALL GetReviewByRid(null);


/* get review - bid */
CALL GetReviewByBid('B2');
CALL GetReviewByBid('B9');
CALL GetReviewByBid('B7');
CALL GetReviewByBid('B100');
CALL GetReviewByBid(null);
CALL GetReviewByBid('B1');

/* update review */
CALL UpdateReviewTextByRid('R1', "update1", 1);
/* test if stars gets updated in Business*/
CALL GetBusinessByBid('B1');
CALL UpdateReviewTextByRid('R900', "3", 1);
CALL UpdateReviewTextByRid('R1', "update", null);

/* render review */
CALL GetReviewDetails('R1');
CALL GetReviewDetails('R3');

/* not exist case */
CALL GetReviewDetails('R300');
CALL GetReviewDetails(null);

/* getRidByBid */
Call GetRidByBid ('B1');
Call GetRidByBid ('B3');

/* DELETE review */
/* not exist case */
CALL DeleteReview ('R@');
CALL DeleteReview (null);

CALL LeaveReview('B2', 'U9', 'This is a great business.');
CALL GetReviewDetails('gs8qfbqDSPXFWdTGo2XSUv');
CALL DeleteReview('gs8qfbqDSPXFWdTGo2XSUv');
CALL GetReviewDetails('gs8qfbqDSPXFWdTGo2XSUv');





/* test star distribution */
CALL getStarDistribution('B1');
CALL getStarDistribution('B2');
CALL getStarDistribution('B3');

/* update review */
CALL UpdateReviewTextByRid('R1', "update", 1);
/* test if stars gets updated in Business*/
CALL getStarDistribution('B1');

/* not exist */
CALL getStarDistribution('B100');
CALL getStarDistribution(NULL);

