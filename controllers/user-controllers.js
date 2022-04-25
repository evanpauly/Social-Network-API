const res = require('express/lib/response');
const User = require('../models/User');

const userController = {
    createUser({ body }, res) {
        const user = new User(body)
        User.create(user)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .populate([
            { path: 'thoughts', select:['-__v', '-user'] },
            { path: 'friends', select:['-__v', '-thoughts'] }
        ])
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUser({ params }, res) {
        User.findOne({
            _id: params.id
        })
        .select('-__v')
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
    User.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
    .then(dbUserData =>  {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user with this ID.' });
            return;
        }
        res.json(dbUserData);
        )}
}




}
