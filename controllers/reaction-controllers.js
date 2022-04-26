const Thought = require('../models/Thought')

const reactionController = {
    addReaction({ params, body }, res ) {
        Thought.findOneAndUpdate({ _id: params.thoughtId })
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No thought with this ID.' });
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => {
            res.sendStatus(500).json(err);
        });
},
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId })
    .then(dbReactionData => {
        if(!dbReactionData){
            res.status(404).json({ message: 'No thought with this ID.' });
            return;
        }
        res.json(dbReactionData)
    })
    .catch(err => {
        res.sendStatus(500).json(err)
    });
}
}

module.exports = reactionController;