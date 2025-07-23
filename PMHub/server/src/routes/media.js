const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/auth');

// Route to search for movies and series
router.get('/search', mediaController.searchMedia);

// Route to add a media item to the user's library
router.post('/add', authMiddleware, mediaController.addMedia);

// Route to get the user's media library
router.get('/library', authMiddleware, mediaController.getUserLibrary);

// Route to rate a media item
router.post('/rate/:id', authMiddleware, mediaController.rateMedia);

// Route to comment on a media item
router.post('/comment/:id', authMiddleware, mediaController.commentMedia);

module.exports = router;