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
