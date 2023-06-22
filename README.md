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



## START front end on localhost:8000
```
cd client-side
npm run dev
```


## server-side: REST API on localhost:3000
```
cd server-side
nodemon(or node) index.js
```

POST ```/api/auth/signup```  **not create session cookie yet**  
POST ```/api/auth/login```   **create session cookie**  
DELETE ```/api/auth/logout``` **destroy session cookie**   


GET ```/api/review/:rid```  
PUT ```/api/review/:rid```  
DELETE ```/api/review/:rid```  
POST ```/api/review/:rid/cool```  

## feature it currently support
- authentication
- search business by name, category
- write, update, delete review
- thumbs up for others comment
