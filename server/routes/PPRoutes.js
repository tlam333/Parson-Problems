const router = require('express').Router();
let ParsonProblem = require('../models/parsonProblem');

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

router.route('/update/:id').post((req, res) => {
    ParsonProblem.findById(req.params.id)
        .then(parsonProblem => {
            parsonProblem.username = req.body.username;
            parsonProblem.description = req.body.description;
            parsonProblem.duration = Number(req.body.duration);
            parsonProblem.date = Date.parse(req.body.date);

            parsonProblem.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;