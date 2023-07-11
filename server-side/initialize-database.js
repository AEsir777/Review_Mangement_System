import pool from './config/db.js';
import fs from 'fs';
import path from 'path';

const initialize_sql = path.join('..', 'SQL-query', 'sample-datasets', 'initialize-test.sql');

async function executeQuery(query) {
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return;
      }
      console.log('Query executed successfully:', result);
    });
}


const sqlQuery = await fs.readFileSync(initialize_sql, 'utf-8');
await executeQuery(sqlQuery);



