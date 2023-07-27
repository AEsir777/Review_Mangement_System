/**** add friend ******/
/*** Test insert and isFriend ******/
-- check: not exist before
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "HzoQKKHDq9BI37dyJAAtGA");
-- success case
CALL InsertFriend("rppTTi-kfF8-qyiArNemag", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "sHozd2pcOKwHtPr8VlZJfg");
-- success case
CALL InsertFriend("rppTTi-kfF8-qyiArNemag", "sHozd2pcOKwHtPr8VlZJfg");
-- check
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "sHozd2pcOKwHtPr8VlZJfg");

-- check: exist before
CALL CheckFriendship("LwZJFLGxQwjjeOgpqTJnfw", "RHsmgIvCfnFL7DPNptKY8A");
CALL CheckFriendship("c7XI431TnC9_AkmC-qrXvQ", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL CheckFriendship("w-zD8Ln3XZszM82AfVrspg", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL CheckFriendship("8Akq8sh1LSmJbqa6Jjxxqg", "96IKLbNHdK-sOAjuMwoegw");
CALL CheckFriendship("TDXV6AC5PYOZEyN9eeODfA", "7xp_8X8QRAgHFZGs8M7FCw");
CALL CheckFriendship("UVUIi0q38pAvsfuEEppe0Q", "JFIr4bbO2zjQYdA3LwbbsQ");
CALL CheckFriendship("aA0WQpDdksKuDafTGzJf_A", "qvmL6mp-rpIwVguxb5HuvQ");
CALL CheckFriendship("q9xZ_o95MTmBmLLPnZyBwQ", "47iiqGmXi6UtE0wd8bRWpQ");
CALL CheckFriendship("Js4nQlGRjS1Bd5vsAQQfgA", "4YwesZEX8VPPJOKLfPD7lg");

-- check: insert fail
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "RHsmgIvCfnFL7DPNptKY8A");
CALL InsertFriend("c7XI431TnC9_AkmC-qrXvQ", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL InsertFriend("w-zD8Ln3XZszM82AfVrspg", "RgDVC3ZUBqpEe6Y1kPhIpw");
CALL InsertFriend("8Akq8sh1LSmJbqa6Jjxxqg", "96IKLbNHdK-sOAjuMwoegw");
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "abcd");
CALL InsertFriend("LwZJFLGxQwjjeOgpqTJnfw", "");









/**** authentication ******/
/*** Test insert (mostly already tested when inserting into) ******/
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614174000', 'test1@example.com', 'password');
CALL InsertIntoUserAuth('123e4567-e89b-12d3-a456-426614171234', 'test2@example.com', 'pwd');

/*** Test get user ***/
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614174000');
CALL GetUserByUid('123e4567-e89b-12d3-a456-426614171234');
CALL GetUserByUid("w-zD8Ln3XZszM82AfVrspg");
CALL GetUserByUid("qvmL6mp-rpIwVguxb5HuvQ");
CALL GetUserByUid("eTvp_hYnsrI5-ow_sQ31_g");
CALL GetUserByUid("GG0mFsEXb-02_dzFPqRV1Q");
CALL GetUserByUid("not exist");










/****** searchBusiness ******/
/*** Test insert ******/
-- Insert a new business record
CALL InsertIntoBusiness("MTSW4McQd7CbVtyjqonnmb", -73.987, 39.9555052, '8AM-5PM', 1, 'YunShang Noodle', '123 Main St', 'N2L 0E2', NULL, 0, 1);

-- Verify the insertion by retrieving the business record
CALL GetBusinessByBid("MTSW4McQd7CbVtyjqonnmb");

-- Retrieve a business record by bid
-- Check review count and star
CALL GetBusinessByBid("kfNv-JZpuN6TVNSO6hHdkw");
CALL GetBusinessByBid("MTSW4McQd7CbVtyjqoe9mw");
CALL GetBusinessByBid("MTSW4McQd7CbVtyjqonnmb");
CALL GetBusinessByBid(null);

-- Search for businesses by category, name, state, and city
CALL SearchBusinessBy('Restaurants; Food; Bubble Tea; Coffee & Tea; Bakeries',
 'St Honore Pastries', 'PA', 'Philadelphia');
CALL SearchBusinessBy('Burgers; Fast Food; Sandwiches; Food; Ice Cream & Frozen Yogurt; Restaurants',
 'Sonic Drive-In', 'TN', 'Ashland City');
CALL SearchBusinessBy(null, null, 'PA', 'Philadelphia');
CALL SearchBusinessBy(null, null, 'NY', 'New York');
CALL SearchBusinessBy(null, null, null, 'New York');
CALL SearchBusinessBy(null, null, null, null);
CALL SearchBusinessBy('Korean; Restaurants', null, null, null);
CALL SearchBusinessBy(NULL, null, 'TX', null);
CALL SearchBusinessBy('Italian; Restaurants', null, null, 'Tucson');
CALL SearchBusinessBy('Italian; Restaurants', null, 'AZ', 'Tucson');

/* photos */
CALL GetPhotoDetails ("Nk-SJhPlDBkAZvfsADtccA");
CALL GetPhotoDetails ("jTFl9Cr7RqZqwjH-CI1ZPw");
CALL GetPhotoDetails (null);
CALL GetPhotoDetails ("R32_LaNcLXyS2-dtrcuBGw");
CALL GetPhotoDetails ("sr-5EY6bmp4jINhea06MjA");
-- fail
CALL GetPhotoDetails ("not exist");













/****** cool ******/
CALL CoolByRid("jNwGwhrvj85SrR96c-Y8Tw", 
"uEgYr-Umi76NKTrMeDQq1Q");
CALL CoolByRid("7riPtZTh-uIPegJiGkvgzw", 
"uEgYr-Umi76NKTrMeDQq1Q");

/* check cools */
CALL GetUserByUid("1xzVJtkjnUUYsFJ8xRMxYg");

/* test if a review is already cooled  */
CALL IsCool("jNwGwhrvj85SrR96c-Y8Tw", 
"uEgYr-Umi76NKTrMeDQq1Q");
CALL IsCool("7riPtZTh-uIPegJiGkvgzw", 
"uEgYr-Umi76NKTrMeDQq1Q");
CALL IsCool('test', "uEgYr-Umi76NKTrMeDQq1Q");
CALL IsCool(null, "uEgYr-Umi76NKTrMeDQq1Q");

/* test if cools added in user profile */
CALL GetUserByUid("1xzVJtkjnUUYsFJ8xRMxYg");

/* check cools */
CALL GetUserByUid("dQE8Yy6EDujaMJQmke70Vw");
CALL GetUserByUid("qJ1--wZxPBCQNOQxdDQttQ");
CALL GetUserByUid("POK5FlWefqHWz8g4KAHH4Q");

/* cancel cool */
CALL cancelCool("N7-45NRKghcDaYqBXnEBiw", 
"dQE8Yy6EDujaMJQmke70Vw")
CALL cancelCool("TSPqvlIQGQhVbEwHlCemTA", 
"qJ1--wZxPBCQNOQxdDQttQ")
CALL cancelCool("POK5FlWefqHWz8g4KAHH4Q", 
"POK5FlWefqHWz8g4KAHH4Q")

/* test if cools in user profile update after cool got cancelled*/
CALL GetUserByUid("dQE8Yy6EDujaMJQmke70Vw")
CALL GetUserByUid("qJ1--wZxPBCQNOQxdDQttQ")
CALL GetUserByUid("POK5FlWefqHWz8g4KAHH4Q")












/****** review ******/
/*** Test the insertion feature ***/
CALL LeaveReview("-0epFLgYq2C1Jo_W4FOBKw",
 "uEgYr-Umi76NKTrMeDQq1Q", 'This is a great business.');
CALL LeaveReview("-0TffRSXXIlBYVbb5AwfTg",
 "uEgYr-Umi76NKTrMeDQq1Q", 'This is a great business.');
CALL LeaveReview("-1MhPXk1FglglUAmuPLIGg",
 "uEgYr-Umi76NKTrMeDQq1Q", null);

/* fail cases - should not be able to add */
CALL LeaveReview(null, "uEgYr-Umi76NKTrMeDQq1Q", 'This is a great business x3.');
CALL LeaveReview('not exist', 'not exist', 'This is a great business x3.');


/* get review - start with RID */
CALL GetReviewByRid("3Ta-cyj4Iu8XBAltOrdj6A");
CALL GetReviewByRid("jNwGwhrvj85SrR96c-Y8Tw");
CALL GetReviewByRid("XKLhk03jCPnDiRQk1GzOVA");
CALL GetReviewByRid(null);


/* get review - bid */
CALL GetReviewByBid("--7PUidqRWpRSpXebiyxTg");
CALL GetReviewByBid("-0TffRSXXIlBYVbb5AwfTg");
CALL GetReviewByBid("-0epFLgYq2C1Jo_W4FOBKw");
CALL GetReviewByBid('B100');
CALL GetReviewByBid(null);

/* update review */
CALL UpdateReviewTextByRid("3Ta-cyj4Iu8XBAltOrdj6A",
 "update1", 1);
/* test if stars gets updated in Business*/
CALL GetBusinessByBid("--7PUidqRWpRSpXebiyxTg");
CALL UpdateReviewTextByRid('R900', "3", 1);
CALL UpdateReviewTextByRid('R1', "update", null);

/* render review */
CALL GetReviewDetails("3Ta-cyj4Iu8XBAltOrdj6A");
CALL GetReviewDetails("jNwGwhrvj85SrR96c-Y8Tw");

/* not exist case */
CALL GetReviewDetails('R300');
CALL GetReviewDetails(null);

/* getRidByBid */
Call GetRidByBid ("--7PUidqRWpRSpXebiyxTg");
Call GetRidByBid ("-0TffRSXXIlBYVbb5AwfTg");

/* DELETE review */
/* not exist case */
CALL DeleteReview ('R@');
CALL DeleteReview (null);


CALL GetReviewDetails("-QGsoLVpuJlduGCcJX6-NQ");
CALL DeleteReview("-QGsoLVpuJlduGCcJX6-NQ");
CALL GetReviewDetails("-QGsoLVpuJlduGCcJX6-NQ");





/* test star distribution */
CALL getStarDistribution("--7PUidqRWpRSpXebiyxTg");
CALL getStarDistribution("-7KAng29RoHr87mvOFbK9w");
CALL getStarDistribution("-7wXZWnKe26iwJY_5z_AAw");

/* update review */
CALL UpdateReviewTextByRid("3Ta-cyj4Iu8XBAltOrdj6A",
 "update", 1);
/* test if stars gets updated in Business*/
CALL getStarDistribution("--7PUidqRWpRSpXebiyxTg");

/* not exist */
CALL getStarDistribution('B100');
CALL getStarDistribution(NULL);

