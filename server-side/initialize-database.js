import pool from './config/db.js';
import fs from 'fs';
import path from 'path';

const sqlFolder = '../SQL-query/create-table-trigger';
const createFiles = ['/CreateUserAuth.sql', 'CreateUserFile.sql', 'CreateReview.sql', 'CreateReviewTriggers.sql',
    'CreateLocation.sql', 'CreateFriend.sql', 'CreateBusiness.sql', 'CreateReview.sql', 'CreateCoolHistory.sql', 
    'CreateCoolTriggers.sql', 'CreateCategory.sql', 'CreateReviewWith.sql'];
const sqlFolder2 = '../SQL-query/sample-datasets';

async function executeQuery(query) {
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return;
      }
      console.log('Query executed successfully:', result);
    });
}


await createFiles.forEach(async (file) => {
    if (file.endsWith('.sql')) {
        const sqlFilePath = path.join(sqlFolder, file);
        const sqlQuery = await fs.readFileSync(sqlFilePath, 'utf-8');
        await executeQuery(sqlQuery);
    }
});

fs.readdir(sqlFolder2, (err, files) => {
    if (err) {
      console.error('Error reading SQL files:', err);
      return;
    }
  
    files.forEach((file) => {
      if (file.endsWith('.sql')) {
        const sqlFilePath = path.join(sqlFolder2, file); // Corrected: Use sqlFolder2 instead of sqlFolder
        const sqlQuery = fs.readFileSync(sqlFilePath, 'utf-8');
        executeQuery(sqlQuery);
      }
    });
  });

