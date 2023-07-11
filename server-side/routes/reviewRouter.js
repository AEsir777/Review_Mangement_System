import express from 'express';
const reviewRouter = express.Router();

import reviewController from '../controllers/reviewController.js';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }
    console.log(req.user + " is not authenticated.");
    return res.status(401).json({ message: 'Authentication required' });
};
reviewRouter.use(isAuthenticated); 

// get the review
reviewRouter.route('/:rid').get(reviewController.renderReview)  // get the review body
    .put(reviewController.updateReview)                         // modify the review content
    .delete(reviewController.deleteReview);                     // delete the whole review


reviewRouter.route('/bid/:rid').get(reviewController.getbidByrid);
// cool the review
reviewRouter.route('/:rid/cool').post(reviewController.coolReview);


export default reviewRouter;