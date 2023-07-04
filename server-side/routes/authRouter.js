import express from 'express';
import AuthController from '../controllers/authController.js';


const authRouter = express.Router();

// register
authRouter.post('/signup', AuthController.signupUser);

// login logout
authRouter.post('/login', AuthController.loginUser);

authRouter.delete('/logout', AuthController.logoutUser);

export default authRouter;
