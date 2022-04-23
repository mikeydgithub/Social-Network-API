// import dependancies
const { Thought, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create the schema for the model
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            match: /^[a-z][0-9][A-Z]{1,280}$/
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
        
    }
);

reactionSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
});


const Thought = model ('User', ThoughtSchema)
module.exports = Thought