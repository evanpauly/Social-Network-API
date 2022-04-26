const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThought,
    updateThought,
    deleteThought
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

module.exports = router;