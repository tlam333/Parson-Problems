const { PythonShell } = require('python-shell');
const path = require('path');
const { joinCodeLines } = require('../helpers/helpers');
const ParsonProblem = require('../models/parsonProblem');


/**
 * Manages the execution of Python code to validate a problem solution.
 * 
 * This function compares the output of the user's code against the expected output from the problem's correct solution.
 * It provides feedback based on whether the user's solution is correct, incorrect, or contains errors.
 *
 * @param {ParsonProblem} problem - An instance of the `ParsonProblem` model, which includes:
 *   - `correctBlocks` (Array<String>): The correct code blocks that should be executed to produce the expected result.
 * 
 * @returns {Promise<String>} A promise that resolves to a feedback message based on the execution results:
 *   - If there is an error in the user's code, the feedback will include the error message.
 *   - If the user's output matches the correct output, the feedback will confirm correctness.
 *   - If the user's output does not match the correct output, the feedback will detail the discrepancy.
 * 
 * @throws {Error} Throws an error if there is an issue executing the Python code or processing the problem.
 */
const managePythonExecution = async (problem, userCode) => {
    try {
        const correctCodeString = joinCodeLines(problem.correctBlocks);
        const correctOutput = await executePythonCode(correctCodeString);
        const correctStdout = correctOutput.stdout;

        const userCodeString = joinCodeLines(userCode);
        const userOutput = await executePythonCode(userCodeString);
        const userStdout = userOutput.stdout;
        const userStderr = userOutput.stderr;

        let result;

        if (userStderr) {
            // If there's an error in the user's code, provide it as feedback
            result = {
                passed: false,
                feedback: `There was an error in your code:\r\n${userStderr}`
            };
        } else if (userStdout.trim() === correctStdout.trim()) {
            result = {
                passed: true,
                feedback: `Correct! Your code produced the expected output.\r\nYour output: ${userStdout}`
            };
        } else {
            result = {
                passed: false,
                feedback: `Your output does not match the correct output.\r\nYour output: ${userStdout}\r\nCorrect output: ${correctStdout}`
            };
        }

        return result;
    } catch (error) {
        throw error;
    }
}




/**
 * Executes Python code and returns the output.
 * @param {String} codeString - The Python code to be executed.
 * @returns {Promise<{ stdout: String, stderr: String }>} - The result of the Python execution.
 */
const executePythonCode = (codeString) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../python/exec.py');

        const pyshell = new PythonShell(scriptPath, {
            mode: 'text'
        });

        let output = '';
        let error = '';

        pyshell.send(codeString);

        pyshell.on('message', (message) => {
            output += message;
        });

        pyshell.on('stderr', (stderr) => {
            error += stderr;
        });

        pyshell.end((err) => {
            if (err || error) {
                // Resolve with both output and error, do not throw
                return resolve({ stdout: output.trim(), stderr: error.trim() });
            }
            resolve({ stdout: output.trim(), stderr: '' });
        });
    });
}

module.exports = { managePythonExecution };
