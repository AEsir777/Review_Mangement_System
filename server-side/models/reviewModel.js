import pool from "./db.js";

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

    static updateReviewTextByRid(rid) {
        
    }

    static deleteReviewByRid(rid) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE * FROM Review WHERE rid = ?', [rid], (err, results) => {
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

    static coolByRid(rid, uid) {
        return new Promise((resolve, reject) => {
            pool.query('Update Review FROM Review WHERE rid = ?', [rid], (err, results) => {
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
}