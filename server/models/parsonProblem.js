const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PPSchema = new Schema({
    prompt: { type: String, required: true }, // Description of the problem
    // language?
    correct_code: { type: [String], required: true }, // Array of strings for the correct code lines
    scrambled_code: { type: [String], required: true }, // Array of strings for the scrambled code lines
}, {
    timestamps: true,  // add createdAt and updatedAt timestamps
});

const ParsonProblem = mongoose.model('ParsonProblem', PPSchema);

module.exports = ParsonProblem;
