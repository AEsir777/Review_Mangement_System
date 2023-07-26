import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import expressMySqlSession from "express-mysql-session";

// import routes
import authRouter from './routes/authRouter.js';
import businessRouter from './routes/businessRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import userProfileRouter from './routes/userProfileRouter.js';
import friendRouter from './routes/friendRouter.js';
import configPassport from './config/passport.js';

const app = express();


// ------- app level middleware --------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  

// cross-origin access
app.use(cors({
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

const MySQLStore   = expressMySqlSession(session);
const sessionStore = new MySQLStore({
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions'
    },
    expiration: 86400000, // Session expiration time in milliseconds (optional)
}, pool);

// session
app.use(session({
    secret: 'we will get 348 out of 100 for cs348',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: sessionStore
}));

configPassport(passport);


// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});


// test connection of the pool
/* pool.query(
    'SELECT * FROM review',
    function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    }
); */

// add routes
app.use('/api/auth', authRouter);
app.use('/api/business', businessRouter);
app.use('/api/review', reviewRouter);
app.use('/api/userProfile', userProfileRouter);
app.use('/api/friends', friendRouter)

app.listen(3000 || process.env.port, () => {
    console.log("Server is running on port 3000.");
});

