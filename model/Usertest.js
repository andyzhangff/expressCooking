const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    avatar: {
        type: String
    },
}, {
    collection: 'usertest'
})

module.exports = mongoose.model('Usertest', userSchema)