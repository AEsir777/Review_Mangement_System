import express from 'express';
import mysql from 'mysql';
import fs from 'fs';
import csv from 'csv-parser';

import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.pwd,
    database: 'mysql'
});

con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

app.get("/", (req, res) => {
    con.query("DROP TABLE IF EXISTS t;");
    con.query("CREATE TABLE t (a INT);");
    fs.createReadStream('test.csv')
        .pipe(csv())
        .on('data', (data) => {
            const query = 'INSERT INTO t (a) VALUES(?)';
            con.query(query, data['Num'], (error, results, fields) => {
                if (error) throw error;
                console.log('Row inserted:', results.insertId);
            });
        });
    res.send("success");
});


app.get("/res", (req, res) => {
    con.query("SELECT * FROM t", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/:table", (req, user) => {
    con.query("CREAT table")
});

app.listen(3000 || process.env.port, () => {
    console.log("Server is running on port 3000.");
});

