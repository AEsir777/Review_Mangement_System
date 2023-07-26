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
            pool.getConnection((err, connection) => {
                if (err) {
                  console.error('Error connecting to database:', err);
                  resolve(null);
                }
              
                connection.beginTransaction((err) => {
                  if (err) {
                    console.error('Error starting transaction:', err);
                    connection.release();
                    resolve(null);
                  }
              
                  connection.query('DELETE FROM CoolHistory WHERE rid = ?', rid, (err) => {
                    if (err) {
                      console.error('Error executing DELETE statement for ReviewWith:', err);
                      connection.rollback(() => connection.release());
                      resolve(null);
                    }
              
                    connection.query('DELETE FROM Review WHERE rid = ?', rid, (err) => {
                      if (err) {
                        console.error('Error executing DELETE statement for CoolHistory:', err);
                        connection.rollback(() => connection.release());
                        resolve(null);
                      }
              
                      connection.query('DELETE FROM ReviewWith WHERE rid = ?', rid, (err) => {
                        if (err) {
                          console.error('Error executing DELETE statement for Review:', err);
                          connection.rollback(() => connection.release());
                          resolve(null);
                        }
              
                        connection.commit((err) => {
                          if (err) {
                            console.error('Error committing transaction:', err);
                            connection.rollback(() => connection.release());
                            resolve(null);
                          }
              
                          resolve('SQL statements executed successfully.');
                          connection.release(); // Release the connection back to the pool
                        });
                      });
                    });
                  });
                });
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

    static getbidByrid(rid) {
        return new Promise((resolve, reject) => {
            pool.query(`
            SELECT name,business.bid
            FROM business,
            (SELECT bid
            FROM reviewwith
            INNER JOIN review ON reviewwith.rid = review.rid
            WHERE reviewwith.rid = ?) tmp
            WHERE tmp.bid = business.bid`, [rid], (err, results) => {
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