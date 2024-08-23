const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyUser = require('../middleware/verifyUser');

router.get('/', verifyUser, userController.getUser);
router.patch('/', verifyUser, userController.updateUser);
router.delete('/', verifyUser, userController.deleteUser);

module.exports = router;