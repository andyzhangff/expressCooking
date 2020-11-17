const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 1,
    },
    avatar: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Genre', genreSchema);