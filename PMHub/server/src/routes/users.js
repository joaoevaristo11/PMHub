const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Route to get user profile
router.get('/profile', authMiddleware, userController.getProfile);

// Route to update user profile
router.put('/profile', authMiddleware, userController.updateProfile);

// Route to delete user account
router.delete('/account', authMiddleware, userController.deleteAccount);

module.exports = router;