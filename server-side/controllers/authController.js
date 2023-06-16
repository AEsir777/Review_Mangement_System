import passport from 'passport';
import userModel from '../models/userModel.js';

class AuthController {
    static signupUser(req, res, next) {
        res.send(userModel.createUser(req.body.email, req.body.pwd));
    }

    static loginUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
              res.status(500).json({ message: 'An error occurred' });
            }

            if (!user) {
                res.status(401).json({ message: 'Authentication failed' });
            }
                
            res.json({ message: 'Authentication successful', user });
          })(req, res, next);
    }

    static logoutUser(req, res) {
        req.logout((err) => {
            if (err) { return next(err); }
            res.json({ message: 'Logout successful' });
        });
    }
}

export default AuthController;