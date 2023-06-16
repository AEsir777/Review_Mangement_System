import express from 'express';
const reviewRouter = express.Router();

//import reviewController from '../controllers/reviewController.js'

// get the review
reviewRouter.route('/:rid').get()  // get the review body
    .put()                         // modify the review content
    .delete();                     // delete the whole review

reviewRouter.post('/:rid/useful'); // useful the review
reviewRouter.post('/:rid/funny'); // funny the review
reviewRouter.post('/:rid/cool');


export default reviewRouter;