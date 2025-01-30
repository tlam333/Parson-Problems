const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Basic User Statistics
const userStatsSchema = new Schema({
    totalProblems: {
        type: Number,
        default: 0
    },
    correctProblems: {
        type: Number,
        default: 0
    },
    problemsSkipped: {
        type: Number,
        default: 0
    },
    timeSpent: {
        type: Number, // Stored in miliseconds
        default: 0
    }
});

userStatsSchema.virtual('correctProblemsRatio').get(function () {
    if (this.totalProblems === 0) return 0;
    const num = this.correctProblems / this.totalProblems;
    return parseFloat(num.toFixed(2));
});

userStatsSchema.virtual('averageTimeSpentPerProblem').get(function () {
    if (this.totalProblems === 0) return 0;
    const num = this.timeSpent / this.totalProblems;
    return parseFloat(num.toFixed(2));
});



const userSchema = new Schema({
    userName : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : { 
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        sparse: true,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    refreshToken: {
        type: String,
        default: null
    },
    description : {
        type: String,
        default: null
    },
    stats: {
        type: userStatsSchema,
        default: {}
    },
    pastProblems : {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ParsonProblem'
            }
        ]
    }
});

// Virtual fields not included by default so we gotta explicitly tell mongoose to include
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);