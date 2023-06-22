import pool from "../config/db.js";

class reviewModel {
    static getReviewByRid(rid) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM Review WHERE rid = ?', [rid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const review = results[0];
                resolve(review);
            });
        });
    }

    static updateReviewTextByRid(rid, text, stars) {
        return new Promise((resolve, reject) => {
            pool.query(
            `UPDATE Review 
            SET text = ?, stars = ?  
            WHERE rid = ?`, [text, stars, rid], (err, results) => {
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

    static deleteReviewByRid(rid) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM Review WHERE rid = ?', [rid], (err, results) => {
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

    static coolByRid(rid, uid) {
        return new Promise((resolve, reject) => {
            pool.query(`
                UPDATE Review
                SET cool = cool + 1
                WHERE rid = ?;
                INSERT INTO CoolHistory (uid, rid) VALUES 
                (?, ?);
                `, [rid, uid, rid], (err, results) => {
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

export default reviewModel;