const ParsonProblem = require('../models/parsonProblem');
const User = require('../models/user');
const geminiInterface = require('../Interfaces/geminiInterface');
const pythonInterface = require('../Interfaces/pythonInterface');
const { joinCodeLines } = require('../helpers/helpers');

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
            problemId: newProblem._id,
            prompt: newProblem.prompt,
            scrambledBlocks: newProblem.scrambledBlocks
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
        const { codeBlocks } = req.body;

        // Retrieve parsons problem
        const problem = await ParsonProblem.findById(req.params.id);
        if (!problem) {
            return res.status(404).send({ error: 'Problem not found' });
        }


        const result = await pythonInterface(joinCodeLines(codeBlocks));

        // Correct
        if (result.passed) {
            const updatedUser = await User.findByIdAndUpdate(
                req.sub,
                { 
                    $inc: 
                    { 
                        'stats.totalProblems': 1,
                        'stats.correctProblems': 1
                        // Add time taken to total time spent
                    }
                }, // Increment total problems by one
                {
                    new: true,
                    runValidators: true
                }
            );
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                req.sub,
                { 
                    $inc: 
                    { 
                        'stats.totalProblems': 1,
                        // Add time taken to total time spent
                    }
                }, // Increment total problems by one
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        return res.status(200).send(result);

    } catch (error) {
        console.log(`parent`);
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
};