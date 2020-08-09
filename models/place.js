const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9 ]+$/, 'Place name is not valid'],
        minlength: 5
    },
    description: {
        type: String,
        required: false,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/, 'Place description is not valid'],
        minlength: 20
    },
    imageUrl: {
        type: String,
        required: true
    },
    articles: [{
        type: 'ObjectId',
        ref: 'Article'
    }]
});

PlaceSchema.path('imageUrl').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid');

module.exports = mongoose.model('Place', PlaceSchema);