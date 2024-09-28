const ParsonProblem = require('../models/parsonProblem');
const User = require('../models/user');
const geminiInterface = require('../Interfaces/geminiInterface');
const { managePythonExecution } = require('../Interfaces/pythonInterface');
const { login } = require('./authController');

exports.createParsonProblem = async (req, res) => {
    try {
        // Extract information to create the Parson Problem
        const { topic, theme } = req.body;

        const { prompt, correctBlocks, scrambledBlocks } = await geminiInterface.generateProblemViaGemini(topic, theme); 

        let newProblem = null; // Declare newProblem once

        // Check if the user is logged in
        if (login) {
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
            scrambledBlocks: newProblem.scrambledBlocks,
            correctBlocks: correctBlocks
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

        if (JSON.stringify(codeBlocks) === JSON.stringify(problem.correctBlocks)) {
            
            return res.status(200).send(
                {
                    passed: true,
                    feedback: `Correct output!`
                }
            )
        } else {
            return res.status(200).send(
                {
                    passed: false,
                    feedback: `Compilation Error!`
                }
            )
        }

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }



    /*
    CBS Dealing with this right now

    We'll come back to it later

    ----------------------------------
    Extra Validation / Python Response
    ----------------------------------


    */
    /*if (!Array.isArray(userCode) || userCode.length === 0) {
        return res.status(400).json({ error: 'Invalid user code input' });
    }

    try {
        const problem = await ParsonProblem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        let feedback = `Correct output!`;

        if (userCode === problem.correctBlocks) {
            return res.status(200).send(
                {
                    passed: true,
                    feedback: `Correct output!`
                }
            )
        } else {
            feedback = await managePythonExecution(problem, userCode);
        }

        problem.feedback = feedback;
        await problem.save();

        return res.status(200).send(
            {
                passed: false,
                feedback: feedback
            }
        );

    } catch (error) {
        console.error('Error during solution submission:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }*/
};