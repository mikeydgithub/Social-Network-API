// import dependancies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create the ReactionSchema for the model
const ReactionSchema = new Schema (
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            match: /^[a-z][0-9][A-Z]{1,280}$/
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    }
)



// create the ThoughtSchema for the model
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model ('Thought', ThoughtSchema)
module.exports = Thought