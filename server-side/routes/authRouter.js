import express from 'express';
import AuthController from '../controllers/authController.js';


const authRouter = express.Router();

// register
authRouter.post('/signup', AuthController.signupUser);

// login logout
authRouter.post('/login', AuthController.loginUser);

authRouter.delete('/logout', AuthController.logoutUser);

/* authRouter.get('/test', (req, res) => {
    console.log("req login");
    console.log(req.user);

    var boo = false;
    if ( (req.user) )
        boo = true; 
    if (boo) {
        // User is authenticated, proceed
        res.json({ message: 'Authenticated user' });
    } else {
        // User is not authenticated, redirect or send an error response
        res.status(401).json({ message: 'Authentication required' });
    }
});  */

export default authRouter;
