const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();



//  '/login'
router.get('/', adminController.getNumUsers);
router.get('/recentProblems', adminController.getRecentProblemSubmissions);

module.exports = router;