const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers')

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(createThought)

router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.route(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;