import pool from "../config/db.js";

class businessModel {
    static getAllReviewsByBid(bid) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT rid, uid
                FROM reviewwith
                WHERE bid LIKE ?`, [bid], (err, results) => {
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

    static getPhotoByBid(bid) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT pid, caption, label
                FROM Photo
                WHERE bid LIKE ?`, [bid], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve(null);
                    }
                    resolve(results[0]);
                });
        });
    }

    // create new Review entry in review table
    static leaveReview(uid, bid, text, stars) {
        //generate unique 22bit ASCII-based rid
        var rid = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        for (var i = 0; i < 22; i++) {
            rid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        //Insert to database
        return new Promise(async (resolve, reject) => {
            //insert into Review table
            pool.query('INSERT INTO reviewwith (bid, uid, rid) VALUES (?, ?, ?)', [bid, uid, rid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                //insert into reviewwith table (didn't deal with rollback scenario)
                pool.query('INSERT INTO review (rid, date, text, stars, cool) VALUES (?, NOW(), ?, ?, 0)', [rid, text, stars], (err, results) => {
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
            pool.query(`SELECT B.bid, B.longitude, B.latitude, B.hours, 
                                B.name, L.city, L.state, B.address, B.postalCode,
                                B.stars, B.reviewCount, B.isOpen, C.cate 
                        FROM business AS B
                        INNER JOIN location AS L ON L.lid = B.lid
                        INNER JOIN category AS C ON C.bid = B.bid
                        WHERE B.bid = ?`, [bid], (err, results) => {
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

    static searchBusinessBy(category, name, state, city, limit, startat) {
        let catcategory = null;
        if (category != null) {
            catcategory = '%' + category + '%';
        }
        return new Promise((resolve, reject) => {
            pool.query(
            `SELECT *
            FROM business
            LEFT JOIN Photo ON business.bid = Photo.bid
            INNER JOIN location ON location.lid = business.lid
            INNER JOIN category ON category.bid = business.bid
            WHERE (name = ? OR ? IS NULL)
                AND (state = ? OR ? IS NULL)
                AND (city = ? OR ? IS NULL)
                AND (cate LIKE ? OR ? IS NULL)
            LIMIT ? 
            OFFSET ?`, [name,name,state,state,city,city,catcategory,catcategory,parseInt(limit),parseInt(startat)], (err, results) => {
                if (err) {
                    console.log("!!!!");
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log("search result: null");
                    return resolve(null);
                }
                console.log("searchBusinessBy success");
                const business = results;
                resolve(business);
            });
        });
    } 

    static searchBusinessTotalCountBy(category, name, state, city) {
        let catcategory = null;
        if (category != null) {
            catcategory = '%' + category + '%';
        }
        return new Promise((resolve, reject) => {
            pool.query(
            `SELECT COUNT(*) AS count
            FROM business
            INNER JOIN location ON location.lid = business.lid
            INNER JOIN category ON category.bid = business.bid
            WHERE (name = ? OR ? IS NULL)
                AND (state = ? OR ? IS NULL)
                AND (city = ? OR ? IS NULL)
                AND (cate LIKE ? OR ? IS NULL)`, [name,name,state,state,city,city,catcategory,catcategory], (err, results) => {
                if (err) {
                    console.log("????");
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log("search result: null");
                    return resolve(null);
                }
                console.log("searchBusinessTotalCountBy success");
                const business = results;
                resolve(business);
            });
        });
    } 

    static getStarDistribution(bid) {
        return new Promise((resolve, reject) => {
            pool.query(`
            SELECT SUM(CASE WHEN stars = 5 THEN 1 ELSE 0 END) AS fiveStar,
            SUM(CASE WHEN stars = 4 THEN 1 ELSE 0 END) AS fourStar, 
            SUM(CASE WHEN stars = 3 THEN 1 ELSE 0 END) AS threeStar, 
            SUM(CASE WHEN stars = 2 THEN 1 ELSE 0 END) AS twoStar,
            SUM(CASE WHEN stars = 1 THEN 1 ELSE 0 END) AS oneStar,
            SUM(CASE WHEN stars = 0 THEN 1 ELSE 0 END) AS zeroStar
            FROM (SELECT stars, bid FROM ReviewWith as rw JOIN Review as r
            WHERE r.rid = rw.rid) as t1
            WHERE t1.bid = ?;`, [bid], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });

    }
}

export default businessModel;