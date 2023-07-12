/****** review ******/
/*** Test the insertion feature ***/
CALL LeaveReview('"-0epFLgYq2C1Jo_W4FOBKw"',
 '"uEgYr-Umi76NKTrMeDQq1Q"', 'This is a great business.');
CALL LeaveReview('"-0TffRSXXIlBYVbb5AwfTg"',
 '"uEgYr-Umi76NKTrMeDQq1Q"', 'This is a great business.');
CALL LeaveReview('"-1MhPXk1FglglUAmuPLIGg"',
 '"uEgYr-Umi76NKTrMeDQq1Q"', null);

/* fail cases - should not be able to add */
CALL LeaveReview(null, '"uEgYr-Umi76NKTrMeDQq1Q"', 'This is a great business x3.');
CALL LeaveReview('not exist', 'not exist', 'This is a great business x3.');


/* get review - start with RID */
CALL GetReviewByRid('"3Ta-cyj4Iu8XBAltOrdj6A"');
CALL GetReviewByRid('"jNwGwhrvj85SrR96c-Y8Tw"');
CALL GetReviewByRid('"XKLhk03jCPnDiRQk1GzOVA"');
CALL GetReviewByRid(null);


/* get review - bid */
CALL GetReviewByBid('"--7PUidqRWpRSpXebiyxTg"');
CALL GetReviewByBid('"-0TffRSXXIlBYVbb5AwfTg"');
CALL GetReviewByBid('"-0epFLgYq2C1Jo_W4FOBKw"');
CALL GetReviewByBid('B100');
CALL GetReviewByBid(null);


/* update review */
CALL UpdateReviewTextByRid('"3Ta-cyj4Iu8XBAltOrdj6A"',
 "update1", 1);
/* test if stars gets updated in Business*/
CALL GetBusinessByBid('"--7PUidqRWpRSpXebiyxTg"');
CALL UpdateReviewTextByRid('R900', "3", 1);
CALL UpdateReviewTextByRid('R1', "update", null);

/* render review */
CALL GetReviewDetails('"3Ta-cyj4Iu8XBAltOrdj6A"');
CALL GetReviewDetails('"jNwGwhrvj85SrR96c-Y8Tw"');

/* not exist case */
CALL GetReviewDetails('R300');
CALL GetReviewDetails(null);

/* getRidByBid */
Call GetRidByBid ('"--7PUidqRWpRSpXebiyxTg"');
Call GetRidByBid ('"-0TffRSXXIlBYVbb5AwfTg"');

/* DELETE review */
/* not exist case */
CALL DeleteReview ('R@');
CALL DeleteReview (null);


CALL GetReviewDetails('"-QGsoLVpuJlduGCcJX6-NQ"');
CALL DeleteReview('"-QGsoLVpuJlduGCcJX6-NQ"');
CALL GetReviewDetails('"-QGsoLVpuJlduGCcJX6-NQ"');