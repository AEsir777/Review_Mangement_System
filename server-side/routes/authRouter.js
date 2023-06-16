import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import express from 'express';
import AuthController from '../controllers/authController.js';
import UserModel from '../models/userModel.js';

const authRouter = express.Router();

// Configure passport to use the local strategy
passport.use(new LocalStrategy({
    usernameField: 'email', // Specify the field name for the username (email)
    passwordField: 'pwd', // Specify the field name for the password
  },(email, pwd, done) => {
    // verify the user
    UserModel.getUserByemail((email)).then((user) => {
        bcrypt.compare(pwd, user.pwd, (err, result) => {
            if (result) {
                done(null, user.uid);
            }
        });
        return done(null, false);
    }).catch((err) => {
        return done(null, false);
    });
}));

passport.serializeUser((user, callback) => {
    process.nextTick(function () {
        return callback(null, user.id);
    });
});

passport.deserializeUser((id, callback) => {
    // Call the user retrieval logic from the UserController
    UserModel.getUserById(id)
        .then(user => callback(null, user))
        .catch(err => callback(err));
});

// register
authRouter.post('/register', AuthController.signupUser);


// login logout
authRouter.post('/login', AuthController.loginUser);
authRouter.delete('/logout', AuthController.logoutUser);

export default authRouter;
