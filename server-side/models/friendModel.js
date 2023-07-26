import pool from "../config/db.js";

class friendModel {

    static follow(uid1, uid2) {
        return new Promise(async (resolve, reject) => {
            pool.query('INSERT INTO Friend (uid1, uid2) VALUES (?, ?);', [uid1, uid2], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }

    static getfollowers(userid) {
        return new Promise((resolve, reject) => {
            pool.query(`
                    SELECT tmp.uid1, userfile.name
                    FROM
                    (SELECT uid1 FROM Friend
                    WHERE uid2 = ?) tmp
                    INNER JOIN userfile ON userfile.uid = tmp.uid1
                    `, [userid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results);
            });
        });
    }

    static getfollowings(userid) {
        return new Promise((resolve, reject) => {
            pool.query(`


                    SELECT tmp.uid2, userfile.name
                    FROM
                    (SELECT uid2 FROM Friend
                    WHERE uid1 = ?) tmp
                    INNER JOIN userfile ON userfile.uid = tmp.uid2

;
                    `, [userid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results);
            });
        });
    }
}

export default friendModel;