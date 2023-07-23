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

## Load sample datasets from localhost:3306
```
cd server-side
node initialize-database.js
```
which runs all sql script in 
[intialize-test.sql](SQL-query/sample-datasets/initialize-test.sql)

## Load production datasets
With the cleaned csv file, we can import the data in to our mysql database. We applied function “LOAD DATA INFILE ‘path’ INTO TABLE table_name” so that we can import one csv file for a table within a short period of time. In folder “productionDataset”, we created three files and implement them one by one.   
InitializedProductionTable.sql: create table and schema for the database.  
ImportProductionDataBase.sql: load the data in csv file to the table in database.  
FinalizedDBWithTrigger.sql: Set up triggers so that further insertion and update can be automated.  




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
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/0e8009e2-3fdf-4814-98cf-45d2bd60a681)
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/11fa5f6b-e3c5-4e27-9c0c-f0ea572a42a5)

  
- write, update, delete review  
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/de6cf63e-e75e-4a27-8402-1019dc9ba2c0)
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/2cb47e8e-f15a-4c55-9317-1edd9767ef9d)
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/70ffe1c2-4e02-4912-b72a-72c71452e587)

- thumbs up for others comment  
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/815c484e-184c-4902-bd1e-179de1696bda)

- Star Distribution  
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/75b93057-0f24-4a75-a687-88977679f6cf)

- Follow User  
![image](https://github.com/AEsir777/Review_Mangement_System/assets/77596290/eca08dac-3301-407c-b7db-ea4180cb79cb)


## History
- [x] fix all errors in authentication and added features to check invalid auth - Kebing  
- [x] fix authentication in business port - Kebing
- [x] Build a search bar and implement the search query page function - Henry
- [x] implement cool-button functionality - Kebing
- [x] implement a designed search result page - Henry (/main)
- [x] implement scroll-down mechanism (pagination) - Henry
- [x] Implement a main search page - Henry
- [x] fix reviews and cool - Kebing
- [x] Integrate leave-review functionality - Kebing
- [x] Add photo for Business - Kebing
- [x] star distribution - Kebing
- [x] add friend sql - Kebing
- [x] Implement a profile page - Henry
- [x] Add-friend UI (button) - Henry
- [X] Fix the UI of the review in production database - Kebing

## TODO
- [ ] Fix the UI of the star distribution - Kebing
- [ ] Debug the average star - Kebing
- [ ] Add photo for Search result page - Henry
- [ ] friend list on the profile page
- [ ] add friend function 
- [ ] filter on own reviews - Kebing
- [ ] Integrate recommendation model to backend - Kebing
- [ ] pagination for reviews






