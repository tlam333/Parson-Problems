const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();



//  '/login'
router.get('/', adminController.getNumUsers);

module.exports = router;