import passport from 'passport';
import userModel from '../models/userModel.js';

class AuthController {
    static signupUser(req, res, next) {
        console.log("signup");
        userModel.createUser(req.body.email, req.body.pwd).then((id) => {
            passport.authenticate("local")(req, res, function() {
                res.json({ message: 'Signup successful' });
            });
        }).catch((err) => {
            res.status(500).json({ message: 'Email already exists.' });
        });
    }

    static loginUser(req, res, next) {
        console.log('login');
        // Handle successful authentication
        // You can manually redirect or send a response here
        passport.authenticate('local', (err, user, info) => {
            if (err) {
              return res.status(500).json({ message: 'An error occurred' });
            }
        
            if (!user) {
              return res.status(401).json({ message: 'Authentication failed: Wrong password or username. Please try again.' });
            }
        
            // Handle successful authentication
            // You can manually redirect or send a response here
            req.login(user, function(error) {
                if (error) return next(error);
                return res.send(req.user);
            });
          })(req, res, next);
    }

    static logoutUser(req, res) {
        req.logout((err) => {
            if (err) { res.status(500).json({ message: 'An error occurred' }); }

            res.status(200).clearCookie('connect.sid', {
                path: '/',
                secure: false,
                httpOnly: false,
            });
            req.session.destroy(function (err) {
                // console.log(req.user);
                res.json({ message: 'Logout successful' });
            });
        });
    }
}

export default AuthController;