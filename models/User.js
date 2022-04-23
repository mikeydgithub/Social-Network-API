// import dependancies
const { Schema, model } = require('mongoose');

// create the schema for the model
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            match: /\S+@\S+\.\S+/,
            required: 'Email is required',
            unique: true
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [{
            type:Schema.Types.ObjectId,
            ref: [UserSchema]
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

friendCount.virtual('friendCount').get(function() {
    return this.replies.length;
});

const User = model ('User', UserSchema)
module.exports = User