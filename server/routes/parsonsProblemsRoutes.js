const router = require('express').Router();
const parsonsProblemsController = require('../controllers/parsonsProblemsController');

/**
 * Don't forget to add the topic and the context params to the request
 */
router.post('/', parsonsProblemsController.createParsonProblem);

router.post('/submit/:id', parsonsProblemsController.submitSolution);

router.get('/:id', parsonsProblemsController.getProblem);

router.get('/past/:id', parsonsProblemsController.getPastProblems);

module.exports = router;
