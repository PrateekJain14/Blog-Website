// models/Author.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let authorSchema = new Schema({
    name: {
        type: String
    },    
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'authors'
})

authorSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('Author', authorSchema)