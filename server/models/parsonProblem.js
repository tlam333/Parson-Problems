const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parsonProblemSchema = new Schema({
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ipAddress: {
        type: String,
        required: true 
    },
    prompt: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    blocks: {
        type: [String],
        required: true 
    }, // Array of strings for the correct code lines
    solution: {
        type: [String],
        required: true
    } // Array of strings for the scrambled code lines
}, {
    timestamps: true,  // add createdAt and updatedAt timestamps
});

const ParsonProblem = mongoose.model('ParsonProblem', parsonProblemSchema);

module.exports = ParsonProblem;
