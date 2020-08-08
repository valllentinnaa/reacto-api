const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Cube name is not valid'],
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/, 'Cube description is not valid'],
        minlength: 20
    },
    imageUrl: {
        type: String,
        required: true
    },
    articles: [{
        type: 'ObjectId',
        ref: 'Place'
    }],
    creatorId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

ArticleSchema.path('imageUrl').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid');

module.exports = mongoose.model('Article', ArticleSchema);