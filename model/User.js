const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 1,
    },
    id: {
        type: Number,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        max: 20,
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