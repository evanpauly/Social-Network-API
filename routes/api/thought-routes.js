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
.post(createThought)

router
.route('/:id')
.get(getThought)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;