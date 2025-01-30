const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../config/config');
const pythonInterface = require('../Interfaces/pythonInterface');
const { joinCodeLines } = require('../helpers/helpers');


const genAI = new GoogleGenerativeAI(config.ai_api_key);


/**
 * Generates a Parson's problem based on a specific topic and theme using the Gemini model.
 * 
 * @param {String} topic - The topic for the Parson's problem. Should be one of the following:
 *                         'DataFrame', 'NMI', 'Sentence Splitting', 'Correlation',
 *                         'Linear Regression', 'Decision Tree Classifier', 'CSV'.
 * @param {String} theme - The theme for the Parson's problem.
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * - {String} prompt - The question prompt for the Parson's problem.
 * - {Array<String>} correctBlocks - An array of strings representing the correct code blocks,
 *                                     ordered to solve the problem correctly.
 * - {Array<String>} scrambledBlocks - An array of strings representing the correct code blocks,
 *                                       but shuffled to provide a scrambled version of the solution.
 * 
 * @throws {Error} Throws an error if the topic is not one of the predefined values or if the
 *                  model generation or JSON parsing fails.
 */
exports.generateProblemViaGemini = async (topic, theme) => {

    // the query topic for the model to read
    let aiQueryTopic = '';
;
    switch (topic) {
        case 'DataFrame':
            aiQueryTopic += "Dataframes using Pandas";
            break;
        case 'NMI':
            aiQueryTopic += "Normalized Mutual Information (NMI) using scikit-learn";
            break;
        case 'Sentence Splitting':
            aiQueryTopic += "Sentence splitting using nltk.sent_tokenize()";
            break;
        case 'Correlation':
            aiQueryTopic += "Correlations using Pandas";
            break;
        case 'Linear Regression':
            aiQueryTopic += "Linear regression using Scikit-learn";
            break;
        case 'Decision Tree Classifier':
            aiQueryTopic += "Decision tree classifiers using Scikit-learn";
            break;
        case 'CSV':
            aiQueryTopic += "CSV files using pandas";
            break;
        default:
            throw new Error('Please select a prexisting topic');
    }

    // const doNotIncludeSpecials = 'Additionally, in the strings of the "codeBlocks" array, do not include formatting such as unecessary whitespaces preceeding bits of code and new line characters'

    // Construct the prompt based on the selected topic
    const aiQuestion = `Create a Parson's problem based on the theme of ${theme} and the topic of ${aiQueryTopic}. The problem should ask the user to complete a task related to this theme using Python code blocks.

    Provide the correct code, split into blocks, ensuring that the code logically aligns with the task. Format the response as a JSON object with two properties:

    prompt: a string containing the task to be solved.
    codeBlocks: an array of strings, where each string is a line of the correct code, ordered to solve the problem. Each string in the codeBlocks array should contain no newline characters.

    Ensure that all dictionaries in the code are on a single line. Do not include any references to Parson's problems in the prompt field.
    
    Do not include any file opening lines of code`;

    try {

        for (let attempt = 1; attempt <=30; attempt++) {
            // Retrieves the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            // extract the response from gemini
            const result = await model.generateContent(aiQuestion);
            const geminiResponse = result?.response?.text();

            if (!geminiResponse) {
                throw new Error("No response received from the Gemini model");
            }

            // Basic formatting and removing code markers so the string (response.text) can be converted to JSON
            console.log(`Response number ${attempt}`);
            console.log(geminiResponse);

            const problemJSON = cleanJSON(geminiResponse);


            const runPython = await pythonInterface(joinCodeLines(problemJSON['codeBlocks']));

            // If code works
            if (runPython.passed) {
                // Return the question prompt, scrambled blocks and solution

                console.log(`Returned after ${attempt} iterations and running: ${runPython.passed}`);
                return { 
                prompt: problemJSON['prompt'],
                correctBlocks: problemJSON['codeBlocks'],
                scrambledBlocks: [...problemJSON['codeBlocks']].sort(() => Math.random() - 0.5)
            }
            } else {
                continue;
            }
        }

        // If creating response fails
        throw new Error('AI model unable to generate valid response please try again later');
    } catch (error) {
        // Pass error to createParsonProblem top level function
        throw error;
    }
};



/**
 * --------------------------------------------
 * THIS FUNCTION WAS CREATED USING CHAT GPT 3.5
 * --------------------------------------------
 * 
 * Cleans and preprocesses a given JSON string.
 * 
 * This function accepts a JSON string, performs cleaning and preprocessing steps, 
 * and returns a cleaned JSON string. The specific cleaning and preprocessing 
 * steps depend on the implementation details, which are not provided in this 
 * function's current form.
 * 
 * @param {string} jsonString - The JSON string to be cleaned and preprocessed.
 * @returns {string} - The cleaned and preprocessed JSON string.
 * @throws {Error} - Throws an error if the the json cannot be reconciled / formatted correctly
 * 
 */
const cleanJSON = (jsonString) => {
    // Step 1: Remove unwanted markers like ```json, ```, and * if present
    let cleanedString = jsonString.replace(/```json|```|\*/g, '');

    // Step 2: Ensure backslashes are properly escaped for Python compatibility
    // Double escape backslashes for JSON to ensure they're properly understood in Python
    // cleanedString = cleanedString.replace(/\\/g, '\\\\');

    // Step 3: Parse the cleaned string into JSON
    let initJSON;
    try {
        initJSON = JSON.parse(cleanedString);
    } catch (error) {
        throw new Error('Invalid JSON format: ' + error.message);
    }

    // Step 4: Process 'codeBlocks' for trimming and filtering
    if (Array.isArray(initJSON['codeBlocks'])) {
        initJSON['codeBlocks'] = initJSON['codeBlocks']
            .map(line => {
                if (typeof line !== 'string') {
                    throw new Error(`Expected a string, but received ${typeof line}`);
                }
                return line.trim(); // Trim leading and trailing whitespace
            })
            .filter(line => line !== '' && (!line.startsWith('#') || !line.startsWith('/'))); // Remove empty lines and lines starting with '#'
    }

    return initJSON;
};
