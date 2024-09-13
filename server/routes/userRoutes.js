const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyUser = require('../middleware/verifyUser');

router.get('/:id', verifyUser, userController.getUser);
router.patch('/:id', verifyUser, userController.updateUser);
router.delete('/:id', verifyUser, userController.deleteUser);

module.exports = router;