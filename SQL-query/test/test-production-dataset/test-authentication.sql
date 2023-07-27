/**** authentication ******/
/*** Test insert (mostly already tested when inserting into) ******/
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test1@example.com', 'password');
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614171234', 'test2@example.com', 'pwd');

/*** Test get user ***/
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000');
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614171234');
CALL GetUserByUid('w-zD8Ln3XZszM82AfVrspg');
CALL GetUserByUid('qvmL6mp-rpIwVguxb5HuvQ');
CALL GetUserByUid('eTvp_hYnsrI5-ow_sQ31_g');
CALL GetUserByUid('GG0mFsEXb-02_dzFPqRV1Q');
CALL GetUserByUid('not exist');
