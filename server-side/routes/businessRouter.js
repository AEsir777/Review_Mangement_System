import express from 'express';
const businessRouter = express.Router();

import businessController from '../controllers/businessController.js';

//search
businessRouter.get('/search',businessController.searchBusiness);

// get all reviews, addresses ... for one business
businessRouter.get('/:bid', businessController.renderBusinessHomePage);

// leave review
businessRouter.post('/:bid', businessController.leaveReview);



export default businessRouter;