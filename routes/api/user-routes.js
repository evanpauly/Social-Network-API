const router = require('express').Router();

const {
    getAllusers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers')

router
.route('/')
.post(createUser)
.get(getAllusers)

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

router
.route('/:userId/:friendId')
.put(addFriend)
.delete(removeFriend)

module.exports = router;