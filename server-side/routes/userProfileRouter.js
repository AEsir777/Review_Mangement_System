import express from 'express';
const userProfileRouter = express.Router();

import userProfileController from '../controllers/userProfileController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    console.log(req.user + " is not authenticated.");
    return res.status(401).json({ message: 'Authentication required' });
};
userProfileRouter.use(isAuthenticated);


// get all reviews, addresses ... for one business
userProfileRouter.get('/getuseruid', userProfileController.getuseruid);


userProfileRouter.get('/:uid', userProfileController.getProfileAndReviewInfoByUid);





export default userProfileRouter;