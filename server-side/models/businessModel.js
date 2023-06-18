import pool from "../config/db.js";

class businessModel {
    static getAllReviewsByBid(bid) {
        let catbid = '%' + bid + '%';
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT text
                FROM 
                (SELECT rid
                FROM reviewwith
                WHERE bid LIKE ?) r1, review
                WHERE review.rid = r1.rid`, [catbid], (err, results) => {
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

    // create new Review entry in review table
    static leaveReview(bid, uid, text) {
        //generate unique 22bit ASCII-based rid
        var rid = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        for (var i = 0; i < 22; i++) {
            rid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        //Insert to database
        return new Promise((resolve, reject) => {
            //insert into Review table
            pool.query('INSERT INTO review (rid, date, text, stars, cool) VALUES (?, NOW(), ?, 0, 0)', [rid,text], (err, results) => {
                if (err) {
                    return reject(err);
                }
                //insert into reviewwith table (didn't deal with rollback scenario)
                pool.query('INSERT INTO reviewwith (bid, uid, rid) VALUES (?, ?, ?)', [bid,uid,rid], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve (rid);
                });
            });
        });

    }

    static getBusinessByBid(bid) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM business WHERE bid = ?', [bid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const business = results[0];
                resolve(business);
            });
        });
    }

    static searchBusinessBy(category, name, state, city) {
        let catcategory = '%' + category + '%';
        return new Promise((resolve, reject) => {
            pool.query(
            `SELECT *
            FROM business
            INNER JOIN location ON location.lid = business.lid
            INNER JOIN category ON category.bid = business.bid
            WHERE name = ? AND state = ? AND city = ? AND cate LIKE ?`, [name,state,city,catcategory], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const business = results[0];
                resolve(business);
            });
        });
    } 
}

export default businessModel;