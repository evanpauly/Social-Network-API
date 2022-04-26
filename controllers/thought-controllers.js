const User = require('../models/User');
const Thought = require('../models/Thought')

const thoughtController = {
    createThought({ params, body }, res) {
        const thought = new Thought(body)
        thought.user = params.userId
        Thought.create(thought)
        .then(dbThoughtData => {
            User.findOneAndUpdate({ _id: params.userId })
            .then(() => { res.json(dbThoughtData)})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .populate([
            { path: 'user', select:['-__v', '-thoughts'] }
        ])
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
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
}
}

module.exports = thoughtController;