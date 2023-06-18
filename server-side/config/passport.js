import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';


export default (passport) => {
    // Configure passport to use the local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email', // Specify the field name for the username (email)
        passwordField: 'pwd', // Specify the field name for the password
    }, (email, pwd, done) => {
        // verify the user
        UserModel.getUserByemail((email)).then((user) => {
            bcrypt.compare(pwd, user.pwd, (err, result) => {
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }).catch((err) => {
            return done(null, false);
        });
    }));

    passport.serializeUser((user, callback) => {
        process.nextTick(function () {
            return callback(null, user.uid);
        });
    });

    passport.deserializeUser((uid, callback) => {
        // console.log("deserialize " + uid);
        // Call the user retrieval logic from the UserController
        UserModel.getUserByUid(uid)
            .then(user => callback(null, user))
            .catch(err => callback(err));
    });
}