const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
    try {
        if (req.login) {
            const user = await User.findById(req.sub);

            const profileInfo = {
                userName: user.userName,
                description: user.description,
                totalProblems: user.stats.totalProblems,
                correctProblemsRatio: user.stats.correctProblemsRatio,
                averageTimeSpendPerProblem: user.stats.averageTimeSpentPerProblem

            }
            
            console.log(user.stats.averageTimeSpendPerProblem);

            console.log('here');
            return res.status(200).send(profileInfo);
        } else {
            return sendStatus(403); // Not logged in so obv cant get info duhhhh
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`)
    }
}



exports.updateUser = async (req, res) => {
    try {
        if (req.login) {
            const updates = {
                userName: req.body.userName,
                email: req.body.email,
                description: req.body.description
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.sub,
                { $set: updates },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                console.log(`Not found`);
                return res.sendStatus(404);
            } else {
                return res.sendStatus(200);
            }
        } else {
            return sendStatus(403); // Not logged in so obv cant get info
            console.log(`Not logged in`);
        }
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error}`);
    }
}



exports.deleteUser = async (req, res) => {
    try {
        const { password } = req.body;

        const user = await User.findById(req.sub);

        if(!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (passwordMatches) {
            await User.deleteOne({ _id: req.sub });
        } else {
            return res.status(403).send('Incorrect password');
        }

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: "${error}"`);
        
    }
}