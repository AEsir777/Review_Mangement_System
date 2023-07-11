import express from 'express';
const businessRouter = express.Router();

import businessController from '../controllers/businessController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    console.log(req.user + " is not authenticated.");
    return res.status(401).json({ message: 'Authentication required' });
};
// businessRouter.use(isAuthenticated);

//search
businessRouter.get('/search', businessController.searchBusiness);

businessRouter.get('/searchCount', businessController.searchBusinessTotalCount);

// get all reviews, addresses ... for one business
businessRouter.get('/:bid', businessController.getBusinessByBid,
    businessController.renderPhoto,
    businessController.renderBusinessHomePage);

businessRouter.get('/:bid/starDistribution', businessController.renderStarDistribution);


// businessRouter.post('/search', businessController.searchBusiness);

// leave review
businessRouter.post('/:bid', businessController.leaveReview);



export default businessRouter;