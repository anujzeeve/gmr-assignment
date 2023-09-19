const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['in progress', 'completed', 'pending'],
        default: 'pending',
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true,
      },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    qaUserId: { type: mongoose.Schema.ObjectId, required: true}, // QA who is mask task completed or not
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task