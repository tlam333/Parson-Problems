const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parsonProblemSchema = new Schema({
    prompt: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    correctBlocks: {
        type: [String],
        required: true 
    }, // Array of strings for the correct code lines
    scrambledBlocks: {
        type: [String],
        required: true
    }, // Array of strings for the scrambled code lines
    numAttempts: {
        type: Number,
        default: 0
    },
    totalTime: {
        type: Number,   // Time spent in miliseconds
        default: 0
    },
    correct: {
        type: Boolean,
        default: false
    },
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ipAddress: {
        type: String,
        required: true 
    }
}, {
    timestamps: true,  // add createdAt and updatedAt timestamps
});

const ParsonProblem = mongoose.model('ParsonProblem', parsonProblemSchema);

module.exports = ParsonProblem;
