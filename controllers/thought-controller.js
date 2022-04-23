const { User, Thought } = require('../models');

const thoughtController = {
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
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params._id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },

    // create a new thought
    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
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
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

    //add a reaction
    addReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            {_id: params.id },
            { $push: { reaction: params.reactionid }},
            { new: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
                return;
            }
            res.json(dbReactionData);
            })
        .catch(err => res.json(err)); 
    },

    // delete a rection
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
        {_id: params.id },
        { $pull: { reaction: params.reactionid }},
        {new: true}
        )
        .then(dbReactionData => {
        if (!dbReactionData) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
        }
        res.json(dbReactionData);
        })
        .catch(err => res.json(err)); 
    }
}


// data that will be exported
module.exports = thoughtController;