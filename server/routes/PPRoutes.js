const router = require('express').Router();
const fetch = require('node-fetch');
const ParsonProblem = require('../models/parsonProblem');

router.route('/').get((req,res) => {
    ParsonProblem.find()
    .then(parsonProblem => res.json(parsonProblem))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newProblem = new ParsonProblem({
        username,
        description,
        duration,
        date,
    });

    newProblem.save()
    .then(() => res.json('Problem added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    ParsonProblem.findById(req.params.id)
        .then(parsonProblem => res.json(parsonProblem))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ParsonProblem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Problem deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


const AI_API_URL = "";
const AI_API_KEY = "";

router.post('/generate', async (req, res) => {
    const { topic } = req.body;

    // Construct the prompt based on the selected topic
    let prompt = '';
    switch (topic) {
        case 'DataFrame':
            prompt = "";
            break;
        case 'NMI':
            prompt = "";
            break;
        case 'Sentence Splitting':
            prompt = "";
            break;
        case 'Correlation':
            prompt = "";
            break;
        case 'Linear Regression':
            prompt = "";
            break;
        case 'Decision Tree Classifier':
            prompt = "";
            break;
        case 'CSV':
            prompt = "";
            break;
        default:
            return res.status(400).json({ error: 'Invalid topic selected' });
    }

    try {
        // Send prompt to AI API
        const response = await fetch(AI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to generate code from AI API');
        }

        const data = await response.json();
        const generatedCode = data.code; // Assuming the API returns code under the "code" field

        // Process the code (split it into lines for Parsons Problem)
        const codeLines = generatedCode.split('\n');

        // Scramble the code lines (you can implement a more sophisticated shuffling algorithm)
        const scrambledCode = [...codeLines].sort(() => Math.random() - 0.5);

        // Save the problem in MongoDB
        const parsonProblem = new ParsonProblem({
            title: `Parsons Problem - ${topic}`,
            description: `Rearrange the code lines to correctly solve the ${topic} problem.`,
            language: 'Python', // Assume Python for this example
            correct_code: codeLines,
            scrambled_code: scrambledCode,
            difficulty: 'medium', // Set difficulty based on your preference
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


module.exports = router;