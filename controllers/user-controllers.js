const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-_v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    
}



// const userController = {
//     test(req, res) {
//         console.log('route is working')
//         res.json('awesome job')
//     }
// }

module.exports = userController;