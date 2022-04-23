// import dependancies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create the schema for the model
const UserSchema = new Schema(
    {
        userName: {
            type: String,
        }
    })