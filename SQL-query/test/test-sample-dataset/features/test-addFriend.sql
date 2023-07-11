/**** add friend ******/
/*** Test insert and isFriend ******/
-- check: not exist before
CALL CheckFriendship('U3', 'U8');
-- success case
CALL InsertFriend('U3', 'U8');
-- check
CALL CheckFriendship('U3', 'U8');

-- check: exist before
CALL CheckFriendship('U1', 'U2');
CALL CheckFriendship('U7', 'U8');
CALL CheckFriendship('U1', 'U6');

-- check: insert fail
CALL InsertFriend('U1', 'U2');
CALL InsertFriend('U1', 'U200');
