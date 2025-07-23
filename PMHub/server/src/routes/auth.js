const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

// Route for user registration
router.post('/register', validateRegistration, authController.register);

// Route for user login
router.post('/login', validateLogin, authController.login);

module.exports = router;