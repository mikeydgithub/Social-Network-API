// functionality inside the controller 

// handle user model updates
const { User, Thought } = require('../models');

// the functions will go in here as methods
const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // .populate the relationship for thoughts
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        // if no user id is found, send 404
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message:'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            console.log(dbUserData);
            if(!dbUserData) {
                return res.status(404).json({message: 'No user with this id!'});
            }
            return Thought.find(
                { _id: params.thoughtId },
                { $pull: {thoughts: params.thoughtId } }
            )
        })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    // add friend
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
        {_id: params.id },
        { $push: { friends: params.friendid }},
        {new: true}
        )
        .then(dbFriendData => {
        if (!dbFriendData) {
            res.status(404).json({ message: 'No friend found with this id!' });
            return;
        }
        res.json(dbFriendData);
        })
        .catch(err => res.json(err)); 
    },

    // delete a friend
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
        {_id: params.id },
        { $pull: { friends: params.friendid }},
        {new: true}
        )
        .then(dbFriendData => {
        if (!dbFriendData) {
            res.status(404).json({ message: 'No friend found with this id!' });
            return;
        }
        res.json(dbFriendData);
        })
        .catch(err => res.json(err)); 
    }

}
    


// data that will be exported
module.exports = userController;