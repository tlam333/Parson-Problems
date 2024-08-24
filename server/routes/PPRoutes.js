const router = require('express').Router();
let ParsonProblem = require('../models/parsonProblem');

// Route to get all Parsons Problems
router.route('/').get((req, res) => {
    ParsonProblem.find()
        .then(parsonProblems => res.json(parsonProblems))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new custom Parsons Problem
router.route('/add').post((req, res) => {
    const prompt = req.body.prompt;
    const correct_code = req.body.correct_code;
    const scrambled_code = req.body.scrambled_code;
    const feedback = req.body.feedback;

    const newProblem = new ParsonProblem({
        prompt,
        correct_code,
        scrambled_code,
        feedback,
    });

    newProblem.save()
        .then(() => res.json('Problem added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to get a specific Parsons Problem by ID
router.route('/:id').get((req, res) => {
    ParsonProblem.findById(req.params.id)
        .then(parsonProblem => res.json(parsonProblem))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a specific Parsons Problem by ID
router.route('/:id').delete((req, res) => {
    ParsonProblem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Problem deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
