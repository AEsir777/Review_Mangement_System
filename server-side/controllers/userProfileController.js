import userProfileModel from '../models/userProfileModel.js';

class userProfileController {
    static getProfileAndReviewInfoByUid(req, res, next) {
        console.log("get profile and reviews info by uid");
        userProfileModel.getuserinfoByuid(req.params.uid).then(Profile => {
            userProfileModel.getallreviewsByuid(req.params.uid).then(reviews => {
                res.json({
                    review: reviews,
                    profile: Profile[0]
                });
            });
        }).catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static getuseruid(req, res, next) {
        const uid = req.user.uid;
        res.json({
            uid: uid
        });
    }
}


export default userProfileController;