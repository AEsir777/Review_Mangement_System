import pool from "../config/db.js";

class reviewModel {
    static getReviewByRid(rid) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT rid, bid, date, text, stars, cool, name, uid FROM Review 
                NATURAL JOIN ReviewWith
                NATURAL JOIN UserFile
                where rid = ?;`
                , [rid], (err, results) => {
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

    static isCooled(rid, uid) {
        return new Promise((resolve, reject) => {
            pool.query(`
                    SELECT * FROM CoolHistory 
                    WHERE rid = ? AND uid = ?;
                    `, [rid, uid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(false);
                }
                resolve(true);
            });
        });
    }

    static async coolByRid(rid, uid) {
        return this.isCooled(rid, uid).then(isCooled => {
            let sql = `INSERT INTO CoolHistory (uid, rid) VALUES (?, ?);`;
            
            if ( isCooled ) {
                sql = `DELETE FROM CoolHistory where uid = ? AND rid = ?;`
            }

            return new Promise((resolve, reject) => {
                pool.query(sql, [uid, rid], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    resolve(results);
                });
            });
        });
    }
}

export default reviewModel;