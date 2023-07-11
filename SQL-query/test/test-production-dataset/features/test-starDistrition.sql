/* test star distribution */
getStarDistribution('B1')
getStarDistribution('B2')
getStarDistribution('B3')

/* update review */
CALL UpdateReviewTextByRid('R1', "update", 1);
/* test if stars gets updated in Business*/
CALL GetBusinessByBid('B1');