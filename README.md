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
/main
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
  ![Screenshot 2023-07-03 212221](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/f33d4520-eb99-484a-970b-8973a0ef9766)
  ![Screenshot 2023-07-03 210629](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/a4c74865-d7d4-4597-b4c6-3e3f15bbf43c)

- search business by name, category, city, state or combinations
- write, update, delete review
- thumbs up for others comment

## History
- [x] fix all errors in authentication and added features to check invalid auth - Kebing  
- [x] fix authentication in business port - Kebing
- [x] Build a search bar and implement the search query page function - Henry
- [x] implement cool-button functionality - Kebing
- [x] implement a designed search result page - Henry (/main)
- [x] implement scroll-down mechanism - Henry
- [x] Implement a main search page - Henry
- [x] fix reviews and cool - Kebing
- [x] Integrate leave-review functionality - Kebing

## TODO
- [ ] link picture JSON to backend and frontend - Henry
- [ ] Implement a profile page

