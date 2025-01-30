const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();



//  '/login'
router.post('/login', authController.login);
router.post('/register', authController.register);
router.delete('/logout', authController.logout);

module.exports = router