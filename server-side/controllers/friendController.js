import friendModel from '../models/friendModel.js';

class friendController {
    static follow(req, res, next) {
        console.log("follow");
        friendModel.follow(req.user.uid, req.params.uid).then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static getFollowers(req, res, next) {
        console.log("getFollowers");
        friendModel.getfollowers(req.params.uid).then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }

    static getFollowings(req, res, next) {
        console.log("getFollowings");
        friendModel.getfollowings(req.params.uid).then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }
}




export default friendController;