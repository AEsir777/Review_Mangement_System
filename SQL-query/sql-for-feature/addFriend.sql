INSERT INTO Friend (uid1, uid2) VALUES (?, ?)

SELECT * FROM Friend
WHERE (uid1 = ? AND uid2 = ?) OR (uid2 = ? AND uid1 = ?);