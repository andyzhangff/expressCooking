const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 1,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 1,
    },
    password: {
        type: String,
        required: true,
        max: 1023,
        min: 6,
    }
});

module.exports = mongoose.model('User', userSchema);