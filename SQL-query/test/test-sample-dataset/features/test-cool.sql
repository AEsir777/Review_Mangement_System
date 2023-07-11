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