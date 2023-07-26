import express from 'express';
const friendRouter = express.Router();

import friendController from '../controllers/friendController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    console.log(req.user + " is not authenticated.");
    return res.status(401).json({ message: 'Authentication required' });
};
friendRouter.use(isAuthenticated); 

// get the follows and followers
friendRouter.route('/followers/:uid').get(friendController.getFollowers);
friendRouter.route('/followings/:uid').get(friendController.getFollowings);

friendRouter.route('/follow/:uid').post(friendController.follow);


export default friendRouter;