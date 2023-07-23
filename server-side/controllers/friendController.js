import friendModel from '../models/friendModel.js';

class friendController {
    static addFriend(req, res, next) {
        console.log("add friend");
        friendModel.addFriend(req.user.uid, req.params.uid).then(result => {
           res.status(2000).send('succesful to add friend');
        }).catch(err => {
            console.log(err);  
            res.status(500).send('An error occurred.');
        });
    }
}




export default friendController;