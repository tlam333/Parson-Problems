const User = require('../models/user');
const ParsonProblem = require('../models/parsonProblem');


exports.getNumUsers = async (req, res) => {
    if (!req.role || !req.sub) {
        return res.status(403).send(`Please login as admin to see this route`);
    }
    try {
        if (req.role !== 'admin') {
            return res.status(403).send(`User ${req.sub} has role "${req.role}" and cannot access this route`);
        }

        const userCount = await User.countDocuments({});

        const problemCount = await ParsonProblem.countDocuments({});

        return res.status(200).send(
            {
                numUsers: userCount,
                numProblems: problemCount
            }
        )
    } catch (error) {
        return res.status(500).send(`Internal Server error: ${error}`);
    }
}

exports.getRecentProblemSubmissions = async (req, res) => {
    if (!req.role || !req.sub) {
        return res.status(403).send(`Please login as admin to see this route`);
    }

    try {
        if (req.role !== 'admin') {
            return res.status(403).send(`User ${req.sub} has role "${req.role}" and cannot access this route`);
        }

        const recentProblems = await ParsonProblem.find().sort({ updatedAt: -1}).limit(20).select('userOwner ipAddress topic numAttempts totalTime correct -_id');

        return res.status(200).send({
            recentProblems: recentProblems
        });
    } catch (err) {
        return res.status(500).send({
            "message": "Internal server error. Please try again later."
        });
    }
}