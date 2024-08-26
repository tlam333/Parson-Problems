const router = require('express').Router();
const { stdout } = require('process');
const ParsonProblem = require('../models/parsonProblem');
const { exec } = require('child_process'); // For running code in a shell, but should be done in a secure environment

router.route('/submit/:id').post(async (req, res) => {
    const { userCode } = req.body;

    try {
        // Fetch the problem from the database
        const problem = await ParsonProblem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Combine correct code lines into a single string
        const correctCodeString = problem.correct_code.join('\n');

        // Execute the correct code to determine the expected output
        exec(`python -c "${correctCodeString}"`, (error, correctStdout, correctStderr) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to generate correct output' });
            }

            // Combine user's code lines into a single string
            const userCodeString = userCode.join('\n');
            // const userCodeString = userCode;

            // Execute the user's code
            exec(`python -c "${userCodeString}"`, (userError, userStdout, userStderr) => {
                let feedback = '';
                if (userError) {
                    // If there's an error, return it as feedback
                    feedback = userStderr;
                }
                else {
                    if (userStdout.trim() === correctStdout.trim()) {
                        feedback = userStdout + 'Correct! Your code produced the expected output.';
                    } else {
                        feedback = userStderr;
                    }
                }

                // Optionally save feedback in the database
                problem.feedback = feedback;
                problem.save();

                // Return the feedback to the user
                res.json({ feedback: feedback });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
