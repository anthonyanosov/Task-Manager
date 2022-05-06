const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    projectID: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)
