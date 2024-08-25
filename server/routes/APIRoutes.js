const router = require('express').Router();
const ParsonProblem = require('../models/parsonProblem');
const Configuration = require('openai');
const OpenAIApi = require('openai');

// Configure the OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.AI_API_KEY,  // Ensure this environment variable is set with your OpenAI API key
});

const openai = new OpenAIApi(configuration);

// Route to generate a Parsons Problem using AI API
router.post('/generate', async (req, res) => {
    const { topic } = req.body;

    // Construct the prompt based on the selected topic
    let prompt = '';
    switch (topic) {
        case 'DataFrame':
            prompt = "Generate a Python code example for creating and manipulating a DataFrame using pandas.";
            break;
        case 'NMI':
            prompt = "Generate Python code that calculates Normalized Mutual Information (NMI) using scikit-learn.";
            break;
        case 'Sentence Splitting':
            prompt = "Generate Python code to split a sentence into smaller sentences using nltk.sent_tokenize().";
            break;
        case 'Correlation':
            prompt = "Generate Python code that calculates the correlation between two data sets using pandas.";
            break;
        case 'Linear Regression':
            prompt = "Generate Python code that performs linear regression using scikit-learn.";
            break;
        case 'Decision Tree Classifier':
            prompt = "Generate Python code that trains a decision tree classifier using scikit-learn.";
            break;
        case 'CSV':
            prompt = "Generate Python code that reads from and writes to a CSV file using pandas.";
            break;
        default:
            return res.status(400).json({ error: 'Invalid topic selected' });
    }

    try {
        // Send the prompt to the OpenAI API
        const response = await openai.chat.completions.create({
            model: "davinci-002",  // Use the correct model identifier
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
            temperature: 0.5
        });

        const generatedCode = response.data.choices[0].message.content.trim();

        // Process the code (split it into lines for Parsons Problem)
        const codeLines = generatedCode.split('\n');

        // Scramble the code lines (simple random shuffling)
        const scrambledCode = [...codeLines].sort(() => Math.random() - 0.5);

        // Save the problem in MongoDB
        const parsonProblem = new ParsonProblem({
            prompt: `Rearrange the code lines to correctly solve the ${topic} problem.`,
            correct_code: codeLines,
            scrambled_code: scrambledCode,
            feedback: '',
        });

        await parsonProblem.save();

        // Respond with the scrambled code to the frontend
        res.json({
            problemId: parsonProblem._id,
            scrambledCode: scrambledCode
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
