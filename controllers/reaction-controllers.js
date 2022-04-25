const Thought = require('../models/Thought')

const reactionController = {
    addReaction({ params }, res ) {
        User.findOneAndUpdate({ _id: params.userId })
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