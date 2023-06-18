import reviewModel from '../models/reviewModel.js';

class reviewController {
    static renderReview(req, res, next) {
        console.log("rendering review");
        reviewModel.getReviewByRid(req.params.rid).then(review => {
            res.json({
                review: review,
            });
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static updateReview(req, res, next) {
        console.log("update review");
        reviewModel.updateReviewTextByRid(req.params.rid, req.body.text, req.body.stars).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static deleteReview(req, res, next) {
        console.log("delete review");
        reviewModel.deleteReviewByRid(req.params.rid).then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }
    
    static coolReview(req, res, next) {
        console.log("cool clicked");
        reviewModel.coolByRid(req.params.rid).then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }
}




export default reviewController;