import express from 'express';
import mysql from 'mysql';

import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.pwd,
    database: 'cs348'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

connection.query(
    'SELECT * FROM Test',
    function(err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);

app.listen(3000 || process.env.port, () => {
    console.log("Server is running on port 3000.");
});

