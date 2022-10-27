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

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-_v' })
            .populate({ path: 'friends', select: '-_v' })
            .select('-_v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).send({ message: 'There is no user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
}



// const userController = {
//     test(req, res) {
//         console.log('route is working')
//         res.json('awesome job')
//     }
// }

module.exports = userController;