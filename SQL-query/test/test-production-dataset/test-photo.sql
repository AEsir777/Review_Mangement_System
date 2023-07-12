/* photos */
CALL GetPhotoDetails ('"Nk-SJhPlDBkAZvfsADtccA"');
CALL GetPhotoDetails ('"jTFl9Cr7RqZqwjH-CI1ZPw"');
CALL GetPhotoDetails (null);
CALL GetPhotoDetails ('"R32_LaNcLXyS2-dtrcuBGw"');
CALL GetPhotoDetails ('"sr-5EY6bmp4jINhea06MjA"');
-- fail
CALL GetPhotoDetails ('"not exist"');