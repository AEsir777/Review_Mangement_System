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