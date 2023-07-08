import businessModel from '../models/businessModel.js';

class businessController {
    static renderBusinessHomePage(req, res, next) {
        console.log('get_all_reviews success');
        businessModel.getAllReviewsByBid(req.params.bid).then(reviews => {
            res.json({
                business: req.business,
                reviews: reviews
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
        console.log("getBusinessByBid");
        businessModel.getBusinessByBid(req.params.bid).then(result => {
            req.business = result;
            next();
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }


    static searchBusiness(req, res, next) {
        console.log("searchBusiness");
        businessModel.searchBusinessBy(req.query.category ?? null,
                                        req.query.name ?? null,
                                        req.query.state ?? null,
                                        req.query.city ?? null,
                                        req.query.limit,
                                        req.query.startat).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }

    static searchBusinessTotalCount(req, res, next) {
        console.log("searchBusinessTotalCount");
        businessModel.searchBusinessTotalCountBy(req.query.category ?? null,
                                        req.query.name ?? null,
                                        req.query.state ?? null,
                                        req.query.city ?? null).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        })
    }
}

export default businessController;