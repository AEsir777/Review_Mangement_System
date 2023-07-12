


/****** cool ******/
CALL CoolByRid('"jNwGwhrvj85SrR96c-Y8Tw"', 
'"uEgYr-Umi76NKTrMeDQq1Q"');
CALL CoolByRid('"7riPtZTh-uIPegJiGkvgzw"', 
'"uEgYr-Umi76NKTrMeDQq1Q"');

/* check cools */
CALL GetUserByUid('"1xzVJtkjnUUYsFJ8xRMxYg"');

/* test if a review is already cooled  */
CALL IsCool('"jNwGwhrvj85SrR96c-Y8Tw"', 
'"uEgYr-Umi76NKTrMeDQq1Q"');
CALL IsCool('"7riPtZTh-uIPegJiGkvgzw"', 
'"uEgYr-Umi76NKTrMeDQq1Q"');
CALL IsCool('test', '"uEgYr-Umi76NKTrMeDQq1Q"');
CALL IsCool(null, '"uEgYr-Umi76NKTrMeDQq1Q"');

/* test if cools added in user profile */
CALL GetUserByUid('"1xzVJtkjnUUYsFJ8xRMxYg"');

/* check cools */
CALL GetUserByUid('"dQE8Yy6EDujaMJQmke70Vw"');
CALL GetUserByUid('"qJ1--wZxPBCQNOQxdDQttQ"');
CALL GetUserByUid('"POK5FlWefqHWz8g4KAHH4Q"');

/* cancel cool */
CALL cancelCool('"N7-45NRKghcDaYqBXnEBiw"', 
'"dQE8Yy6EDujaMJQmke70Vw"');
CALL cancelCool('"TSPqvlIQGQhVbEwHlCemTA"', 
'"qJ1--wZxPBCQNOQxdDQttQ"');
CALL cancelCool('"POK5FlWefqHWz8g4KAHH4Q"', 
'"POK5FlWefqHWz8g4KAHH4Q"');