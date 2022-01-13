const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    todo: []
})

module.exports = mongoose.model('todo', todoSchema);