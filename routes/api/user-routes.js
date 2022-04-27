const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers')

router
.route('/')
.post(createUser)
.get(getAllUsers)

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/:userId/:friendId')
.put(addFriend)
.delete(deleteFriend)

module.exports = router;