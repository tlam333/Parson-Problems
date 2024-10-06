const tmp = require('tmp');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);

const cleanTerminalMessage = (messages) => {
    // Regex to match and capture line and character positions
    const captureRegex = /:(\d+):(\d+):/;
    // Regex to remove file path and .py extension
    const filePathRegex = new RegExp(`.*${'.py'}`);

    return messages
        .map(message => {
            // Extract line and character positions
            const match = message.match(captureRegex);
            const line = match ? match[1] : '';
            const char = match ? match[2] : '';

            // Remove the captured line and character positions and file path
            const cleanedMessage = message
                .replace(captureRegex, '') // Remove line and character positions
                .replace(filePathRegex, ''); // Remove file path and .py extension

            // Format and prepend line and char to the cleaned message
            const formattedMessage = line && char 
                ? `Line ${line}: ${cleanedMessage.trim()}`
                : cleanedMessage.trim();

            // Return the formatted message
            return formattedMessage;
        })
        .filter(message => message !== ''); // Remove empty messages
};

module.exports = pythonInterface = async (codeString) => {

    let result = {};

    return new Promise((resolve, reject) => {
        tmp.file({ postfix: '.py', discardDescriptor: true }, async (err, path, fd, cleanupCallback) => {
            if (err) {
                return reject(err);
            }

            // console.log(`Temp file created at: ${path}`);

            try {
                await writeFilePromise(path, codeString);
                // console.log('Data written to file');

                const command = `flake8 ${path}`;
                const { stdout } = await execPromise(`${command}`);

                // If execPromise doesn't throw, test passed
                // console.log('Test Passed');
                result = {
                    passed: true,
                    terminalMessage: `Passed test cases`
                };
            } catch (error) {
                // If an error occurs during exec, test failed
                // console.log(`Test not passed: ${error}`);

                // Process the flake8 output and remove only the file path, keeping the line and character info
                const processedOutput = cleanTerminalMessage(error.stdout.split('\n'));

                result = {
                    passed: false,
                    terminalMessage: processedOutput
                };
            } finally {
                cleanupCallback(); // Clean up the temp file
                // console.log(`At return:`);
                // console.log(result);
                resolve(result); // Return the result
            }
        });
    });
};
