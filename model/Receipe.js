const mongoose = require('mongoose');

const receipeSchema = new mongoose.Schema({
    name: {
        type: {
            receipe_name: String,
            receipe_path: String,
            receipeFeature: String
        },
        required: true,
        max: 255,
        min: 1,
    },
    ingrediant: {
        type: [String],
        required: true,
    },
    step: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
    // owner: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 1,
    // },
    // time: {
    //     type: Date,
    //     required: true,
    // },
    // genre: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 1,
    // },
});

module.exports = mongoose.model('Receipe', receipeSchema);