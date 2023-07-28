/**** add friend ******/
/*** Test insert and isFriend ******/
-- check: not exist before
CALL GetFollowers('_3R2OM6fTkdcc3rPGTZYAQ'); -- the result shouldn't include '_4gdJdZFM0EnWr6v1Qr3A'
CALL GetFollowers('_4gdJdZFM0EnWr6v1Qr3A'); -- the result shouldn't include '_3R2OM6fTkdcc3rPGTZYAQ'
CALL GetFollowings('_3R2OM6fTkdcc3rPGTZYAQ'); -- the result shouldn't include '_4gdJdZFM0EnWr6v1Qr3A'
CALL GetFollowings('_4gdJdZFM0EnWr6v1Qr3A'); -- the result shouldn't include '_3R2OM6fTkdcc3rPGTZYAQ'
-- success case
CALL InsertFriend('_4gdJdZFM0EnWr6v1Qr3A', '_3R2OM6fTkdcc3rPGTZYAQ');
CALL InsertFriend('_3R2OM6fTkdcc3rPGTZYAQ', '_4gdJdZFM0EnWr6v1Qr3A');
-- check
CALL GetFollowers('_3R2OM6fTkdcc3rPGTZYAQ'); 
CALL GetFollowers('_4gdJdZFM0EnWr6v1Qr3A'); 
CALL GetFollowings('_3R2OM6fTkdcc3rPGTZYAQ');
CALL GetFollowings('_4gdJdZFM0EnWr6v1Qr3A'); 

CALL GetFollowers('_3R2OM6fTkdcc3rPGTZYAQ'); 
CALL GetFollowers('0rb0x3YydlvYdbFUysfsg');
CALL GetFollowings('_3R2OM6fTkdcc3rPGTZYAQ');
CALL GetFollowings('0rb0x3YydlvYdbFUysfsg');

-- success case 
CALL InsertFriend("0rb0x3YydlvYdbFUysfsg", "_3R2OM6fTkdcc3rPGTZYAQ");
CALL InsertFriend("_3R2OM6fTkdcc3rPGTZYAQ", "0rb0x3YydlvYdbFUysfsg");

-- check
CALL GetFollowers('_3R2OM6fTkdcc3rPGTZYAQ'); 
CALL GetFollowers('0rb0x3YydlvYdbFUysfsg');
CALL GetFollowings('_3R2OM6fTkdcc3rPGTZYAQ');
CALL GetFollowings('0rb0x3YydlvYdbFUysfsg');

-- check: exist before
CALL GetFollowers("_GvKig8yKIp_WtFtWpntkg");
CALL GetFollowings("qms0w0pmjjjaeNojF3qxQ");
CALL GetFollowers("_H6E5kheFYwu52kCZlF8qg"); 
CALL GetFollowings("1lmyWoPFb_eJvG5Zw3UA");
CALL GetFollowers("_iYyZtuWMmEMFCOKRLYgg"); 
CALL GetFollowings("pQrWjL22uvSWMwS9yZ_Yg");
CALL GetFollowers("_KeuaQCbJsZ7cipYpBPxDQ"); 
CALL GetFollowings("coWYR6JBcD9Qa55ibyqr9Q");
CALL GetFollowers("V3XYG1zKuW8VUBNtjacoxA");

-- check: insert fail
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "RHsmgIvCfnFL7DPNptKY8A");
CALL InsertFriend("c7XI431TnC9_AkmC-qrXvQ", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL InsertFriend("w-zD8Ln3XZszM82AfVrspg", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL InsertFriend("8Akq8sh1LSmJbqa6Jjxxqg", "96IKLbNHdK-sOAjuMwoegw");
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "abcd");
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "");