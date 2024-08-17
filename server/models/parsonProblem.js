const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PPSchema = new Schema({
    username: { type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const ParsonProblem = mongoose.model('ParsonProblem', PPSchema);

module.exports = ParsonProblem;