// setup express.js
const router = require('express').Router();
const { 
    getAllUser, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// Setup GET all and POST at /api/id/friends/:friendid
router
.route('/:id/friends/:friendid')
.post(addFriend)
.delete(deleteFriend)

router
.route('/')
.get(getAllUser)
.post(createUser);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;