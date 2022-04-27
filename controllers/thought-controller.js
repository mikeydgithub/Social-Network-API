const { User, Thought } = require('../models');

const thoughtController = {
    // create a new thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(dataThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dataThoughtData._id } },
                    { new: true, runValidators: true }
                ).then(() => res.json(dataThoughtData))
            })
        .catch(err => res.status(400).json(err));
    },

    // get all thoughts
    getAllThought( req, res ) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get a single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne (
            { _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this id!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },


    //update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate (
            { _id: params.id }, body, 
            { new: true, runvalidater: true }
        )

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
        Thought.findOneAndDelete (
            { _id: params.id }
        )

        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    
    // add a reaction to thought
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate (
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )

        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate (
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true }
        )

        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err)); 
    },
}


// data that will be exported
module.exports = thoughtController;