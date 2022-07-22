// require('../db').connect()

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    createDate: {
        type: Date, default: Date.now
    },
    dir: {
        type: String

    },
    size: {
        type: String

    },
    type: {
        type: String
    },
    isActiv: {
        type: Boolean,
        default: true
    }


})
const fileModel = mongoose.model('file', fileSchema);

module.exports = { fileModel }