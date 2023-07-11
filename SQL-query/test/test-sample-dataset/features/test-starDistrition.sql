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