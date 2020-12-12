// models/Blog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' ,required: true},    
    category: {
        type: String,   required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: Schema.Types.Mixed}
}, {
    timestamps: true,
    collection: 'blogs'
})

module.exports = mongoose.model('Blog', blogSchema)