import express from 'express';
const businessRouter = express.Router();

import businessController from '../controllers/businessController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    return res.status(401).json({ message: 'Authentication required' });
};
// businessRouter.use(isAuthenticated);

//search
businessRouter.get('/search', businessController.searchBusiness);

// get all reviews, addresses ... for one business
businessRouter.get('/:bid', 
    async (req, res, next) => {
      try {
          await businessController.getBusinessByBid(req, res, next);
      } catch(err) {
          next(err);
      }
  }, 
  async (req, res, next) => {
      try {
          await businessController.renderBusinessHomePage(req, res, next);
      } catch(err) {
          next(err);
      }
  }
);

// leave review
businessRouter.post('/search', businessController.searchBusiness);

businessRouter.post('/:bid', businessController.leaveReview);



export default businessRouter;