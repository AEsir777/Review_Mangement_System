/* test star distribution */
CALL getStarDistribution('"--7PUidqRWpRSpXebiyxTg"');
CALL getStarDistribution('"-7KAng29RoHr87mvOFbK9w"');
CALL getStarDistribution('"-7wXZWnKe26iwJY_5z_AAw"');


/* update review */
CALL UpdateReviewTextByRid('"3Ta-cyj4Iu8XBAltOrdj6A"',
 "update", 1);
/* test if stars gets updated in Business*/
CALL getStarDistribution('"--7PUidqRWpRSpXebiyxTg"');




/* not exist */
CALL getStarDistribution('B100');
CALL getStarDistribution(NULL);