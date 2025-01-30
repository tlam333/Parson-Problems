const ParsonProblem = require('../models/parsonProblem');
const User = require('../models/user');
const geminiInterface = require('../Interfaces/geminiInterface');
const pythonInterface = require('../Interfaces/pythonInterface');
const { joinCodeLines } = require('../helpers/helpers');

exports.getProblem = async (req, res) => {
    try {
        const parsonProblem = await ParsonProblem.findById(req.params.id);

        // If no problems found, send a 404 response
        if (!parsonProblem) {
            return res.status(404).send({ message: 'Parson Problem does not exist' });
        }

        // Send the found problems as a response
        res.status(200).json(parsonProblem);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

exports.getPastProblems = async (req, res) => {
    try {
        // Find the user by their ID (assuming req.sub contains the logged-in user's ID)
        const user = await User.findById(req.params.id).populate({
            path: 'pastProblems',
            options: { sort: {createdAt: -1} }
        });

        // If the user doesn't exist, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user has no past problems, return a 404 with a message
        if (!user.pastProblems || user.pastProblems.length === 0) {
            return res.status(404).json({ message: 'No past problems found for this user' });
        }

        // Send the past problems in the response
        // user.pastProblems.forEach((problemID) => {})
        console.log(user.pastProblems)
        return res.status(200).json(user.pastProblems); // returns array of problem IDs
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
};

exports.createParsonProblem = async (req, res) => {
    try {
        // Extract information to create the Parson Problem
        const { topic, theme } = req.body;

        const { prompt, correctBlocks, scrambledBlocks } = await geminiInterface.generateProblemViaGemini(topic, theme); 

        let newProblem = null; // Declare newProblem once

        // Check if the user is logged in
        if (req.login) {

            // Create problem with reference to the logged-in user
            newProblem = new ParsonProblem({
                userOwner: req.sub, // Assuming req.sub contains the user ID
                prompt: prompt,
                topic: topic,
                theme: theme,
                correctBlocks: correctBlocks,
                scrambledBlocks: scrambledBlocks,
                ipAddress: req.ip
            });

            await newProblem.save(); // Ensure save completes before proceeding

            // Find the user and add the new problem to their past problems
            const user = await User.findById(req.sub);
            if (user) {
                user.pastProblems.push(newProblem._id);
                await user.save(); // Ensure the user's document is updated
            }

        } else {
            // Create problem without a user reference
            newProblem = new ParsonProblem({
                prompt: prompt,
                topic: topic,
                theme: theme,
                correctBlocks: correctBlocks,
                scrambledBlocks: scrambledBlocks,
                ipAddress: req.ip
            });

            await newProblem.save(); // Ensure save completes before proceeding
        }

        // Respond with the scrambled code to the frontend
        res.status(200).send({
            _id: newProblem._id,
            prompt: newProblem.prompt,
            scrambledBlocks: newProblem.scrambledBlocks,
            correctBlocks: newProblem.correctBlocks
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Submits the user's solution for a Parson's Problem.
 */
exports.submitSolution = async (req, res) => {
    try {
        const { codeBlocks, elapsedTime } = req.body;

        // Retrieve parsons problem
        const problem = await ParsonProblem.findById(req.params.id);
        if (!problem) {
            return res.status(404).send({ error: 'Problem not found' });
        }

        problem.numAttempts++;
        problem.totalTime += elapsedTime;

        // console.log(`codeBlocks: ${codeBlocks.length}\ncorrectBlocks: ${problem.correctBlocks}`);

        // Check all code blocks used
        if (codeBlocks.length !== problem.correctBlocks.length) {

            await User.findByIdAndUpdate(
                req.sub,
                { 
                    $inc: 
                    { 
                        'stats.totalProblems': 1,
                        'stats.timeSpent': elapsedTime
                    }
                }, // Increment total problems by one
                {
                    new: true,
                    runValidators: true
                }
            );
            problem.save();

            return res.status(200).send({
                passed: false,
                terminalMessage: "Please use all code"
            });
        }



        const result = await pythonInterface(joinCodeLines(codeBlocks));

        // Correct
        if (result.passed) {
            problem.correct = true;
            await User.findByIdAndUpdate(
                req.sub,
                { 
                    $inc: 
                    { 
                        'stats.totalProblems': 1,
                        'stats.correctProblems': 1,
                        'stats.timeSpent': elapsedTime
                    }
                }, // Increment total problems by one
                {
                    new: true,
                    runValidators: true
                }
            );
        } else {
            await User.findByIdAndUpdate(
                req.sub,
                { 
                    $inc: 
                    { 
                        'stats.totalProblems': 1,
                        'stats.timeSpent': elapsedTime
                    }
                }, // Increment total problems by one
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        problem.save();

        return res.status(200).send(result);

    } catch (error) {
        console.log(`parent`);
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
};