const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');



//  '/login'
router.post('/login', authController.login);
router.post('/register', authController.register);
router.delete('/logout', authController.logout);


router.get('/testmiddleware', verifyJWT, (req, res) => { res.send('sigma') });

module.exports = router