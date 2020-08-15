const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Article name is not valid'],
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    imageUrl: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at' } });

ArticleSchema.path('imageUrl').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid');

module.exports = new Model('Article', ArticleSchema);