import pool from "../config/db.js";


class UserProfileModel {
    static getuserinfoByuid(uid) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT *
                FROM userfile
                WHERE uid = ?`, [uid], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    const userfile = results;
                    resolve(userfile);
                });
        });
    }

    static getallreviewsByuid(uid) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT bid, uid, review.rid, date, text, stars, cool
                FROM reviewwith
                INNER JOIN review ON reviewwith.rid = review.rid
                WHERE uid = ?`, [uid], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    const reviews = results;
                    resolve(reviews);
                });
        });
    }
}



export default UserProfileModel;