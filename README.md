# Hotel_Review_Management_System
## Database Drive Application
Node.JS

```
npm install
```
set up ```.env``` file
```
node index.js
```

## create and load your sample database to the platform
```
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
```


## server-side: REST API
/auth  
    /login     
    /signup  
    /logout    
