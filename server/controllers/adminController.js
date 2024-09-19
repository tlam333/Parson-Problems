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
                numberOfUsers: userCount,
                numberofParsonProblems: problemCount
            }
        )
    } catch (error) {
        return res.status(500).send(`Internal Server error: ${error}`);
    }
}