const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;
