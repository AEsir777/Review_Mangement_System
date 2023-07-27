/**** add friend ******/
/*** Test insert and isFriend ******/
-- check: not exist before
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "RgDVC3ZUBqpEe6Y1kPhIpw");
-- success case
CALL InsertFriend("rppTTi-kfF8-qyiArNemag", "RgDVC3ZUBqpEe6Y1kPhIpw");
-- check
CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "RgDVC3ZUBqpEe6Y1kPhIpw");

CALL CheckFriendship("rppTTi-kfF8-qyiArNemag", "sHozd2pcOKwHtPr8VlZJfg");
-- success case 
CALL InsertFriend("rppTTi-kfF8-qyiArNemag", "sHozd2pcOKwHtPr8VlZJfg");
-- check
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