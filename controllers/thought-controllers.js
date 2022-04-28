const { User, Thought } = require('../models')

const thoughtController = {

    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.staus(404).json(err);
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getAllThoughts(req, res) {
        Thought.find({})
        .populate([
            { path: 'reactions', select: '-__v' }
        ])
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    getThought({ params }, res) {
        Thought.findOne({
            _id: params.id
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this ID.' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err =>  {
        console.log(err);
        res.sendStatus(500);
    })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body)
        .then(dbThoughtData =>  {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with this ID.' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }) 
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID.' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
    },

    addReaction({ params, body }, res ) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this ID.' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        res.sendStatus(500).json(err);
    });
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.reactionId })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought with this ID.' });
            return;
    }
    res.json(dbThoughtData)
    })
    .catch(err => {
    res.sendStatus(500).json(err)
    });
}}

module.exports = thoughtController;