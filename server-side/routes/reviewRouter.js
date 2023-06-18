import express from 'express';
const reviewRouter = express.Router();

import reviewController from '../controllers/reviewController.js'

// get the review
reviewRouter.route('/:rid').get(reviewController.renderReview)  // get the review body
    .put(reviewController.updateReview)                         // modify the review content
    .delete(reviewController.deleteReview);                     // delete the whole review

// cool the review
reviewRouter.post('/:rid/cool', reviewController.coolReview);


export default reviewRouter;