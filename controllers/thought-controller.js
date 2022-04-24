const { User, Thought } = require('../models');

const thoughtController = {
    // create a new thought
    addThought({ body }, res) {
        console.log(body)
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },

    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get a single thought by id
    getThoughtById({ params, body }, res) {
        Thought.findOne({ _id: params.id }, body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },


    //update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runvalidate: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message:'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));   
    },

    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },
    
    // add a reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(req.params.id,
            { $push: { reactions: req.body } },
            { new: true }
        )
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => res.json(err)); 
    },

    // delete a rection
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
        {_id: params.id },
        { $pull: { reactions: params.reactionid }},
        {new: true}
        )
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => res.json(err)); 
    }
}


// data that will be exported
module.exports = thoughtController;