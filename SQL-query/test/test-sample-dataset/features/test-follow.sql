/**** add friend ******/
/*** Test insert and isFriend ******/
-- check
CALL GetFollowers('U3'); -- the result shouldn't include U8
CALL GetFollowers('U8'); -- the result shouldn't include U3
CALL GetFollowings('U3'); -- the result shouldn't include U8
CALL GetFollowings('U8'); -- the result shouldn't include U3
-- success case
CALL InsertFriend('U3', 'U8');
CALL InsertFriend('U8', 'U3');
-- -- check
CALL GetFollowers('U3'); -- the result now include U8
CALL GetFollowers('U8'); -- the result now include U3
CALL GetFollowings('U3'); -- the result now include U8
CALL GetFollowings('U8'); -- the result now include U3

-- check: exist before
CALL GetFollowers('U1');
CALL GetFollowers('U2');
CALL GetFollowings('U1');
CALL GetFollowings('U2');


-- check: insert fail
CALL InsertFriend('U1', 'U2');
CALL InsertFriend('U1', 'U200');