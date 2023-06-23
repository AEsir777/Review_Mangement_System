# Hotel_Review_Management_System
## Database Drive Application
Node.JS  
server side: express  
client side: next.js  

Install npm packages in both client/serverside
```
npm install
```
set up ```.env``` file to store mySQL password

## START database from localhost:3306
```
cd server-side
node initialize-datbase.js
```
which runs all sql script in 
[intialize.sql](SQL-query/initialize.sql)

## START front end on localhost:8000
```
cd client-side
npm run dev
```
```
/login
/signup
/logout
/business/:bid
/review/:rid
```

## server-side: REST API on localhost:3000
```
cd server-side
nodemon(or node) index.js
```

POST ```/api/auth/signup```  **not create session cookie yet**  
POST ```/api/auth/login```   **create session cookie**  
DELETE ```/api/auth/logout``` **destroy session cookie**   

GET ```/api/business/search```  
GET ```/api/business/:bid```  
POST ```/api/business/:bid```  
POST ```/api/business/search```  


GET ```/api/review/:rid```  
PUT ```/api/review/:rid```  
DELETE ```/api/review/:rid```  
POST ```/api/review/:rid/cool```  

## feature it currently support
- authentication
- search business by name, category, city, state or combinations
- write, update, delete review
- thumbs up for others comment
