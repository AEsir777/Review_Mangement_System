import businessModel from '../models/businessModel.js';

class businessController {
    static renderBusinessHomePage(req, res, next) {
        console.log('success3');
        businessModel.getAllReviewsByBid(req.params.bid).then(reviews => {
            res.json({
                reviews: reviews,
                // address .... //
            });
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static leaveReview(req, res, next) {
        businessModel.leaveReview(req.params.bid,req.body.uid,req.body.review).then(result => {
            res.send({message: 'Review added successfully'});
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }

    static getBusinessByBid(req, res, next) {
        businessModel.getBusinessByBid(req.body.bid).then(result => {
            res.json({
                result
                // address .... //
            });
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }


    static searchBusiness(req, res, next) {
        businessModel.searchBusinessBy(req.body.category,
                                        req.body.name,
                                        req.body.state,
                                        req.body.city).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }
}

export default businessController;