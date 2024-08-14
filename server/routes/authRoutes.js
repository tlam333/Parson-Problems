const express = require('express');
const userController = require('../controllers/authController');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');



//  '/login'
router.post('/login', userController.login);
router.post('/register', userController.register);


router.get('/testmiddleware', verifyJWT, (req, res) => { res.send('sigma') });

module.exports = router