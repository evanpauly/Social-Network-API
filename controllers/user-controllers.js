const User = require('../models/User');

const userController = {
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .then(dbUserData => {
            if(!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err =>  {
        console.log(err);
        res.sendStatus(500);
    })
},
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData =>  {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
},
deleteUser({ params }, res) {
    User.findOneAndDelete({ userId: params.id }) 
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
},
addFriend({ params }, res ) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
        )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.sendStatus(500);
    });
},
deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { freinds: params.friendId } },
        { new: true }
        )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.sendStatus(500);
    });
}
}

module.exports = userController;