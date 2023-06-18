import mysql from 'mysql';

import * as dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: process.env.pwd,
    database: 'cs348',
    port: 3306
});

export default pool;