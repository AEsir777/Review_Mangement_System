import reviewModel from '../models/reviewModel.js';

class reviewController {
    static renderReview(req, res, next) {
        reviewModel.getReviewByRid(req.params.rid).then(review => {
            reviewModel.isCooled(req.params.rid, req.user.uid).then(isCooled => {
                console.log("rendering review of business");
                res.json({
                    isCooled: isCooled,
                    review: review,
                    writtenByMe: (req.user.uid === review.uid),
                    selfuid: req.user.uid
                });
            });
        }).catch(err => {
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
        console.log(req.user.uid, "clicked cool");
        reviewModel.coolByRid(req.params.rid, req.user.uid).then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static getbidByrid(req, res, next) {
        reviewModel.getbidByrid(req.params.rid).then(result => {
            res.send(result[0]);
        })
        .catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }
}




export default reviewController;