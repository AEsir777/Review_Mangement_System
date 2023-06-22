import express from 'express';
const businessRouter = express.Router();

import businessController from '../controllers/businessController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    return res.status(401).json({ message: 'Authentication required' });
};
businessRouter.use(isAuthenticated);

//search
businessRouter.get('/search', businessController.searchBusiness);

// get all reviews, addresses ... for one business
businessRouter.get('/:bid', businessController.getBusinessByBid);

// leave review
businessRouter.post('/:bid', businessController.leaveReview);



export default businessRouter;