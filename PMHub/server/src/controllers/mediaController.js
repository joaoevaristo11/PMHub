const Media = require('../models/Media');
const User = require('../models/User');

// Add a media item to the user's library
exports.addMedia = async (req, res) => {
    try {
        const { userId, mediaId, mediaType } = req.body;
        const mediaItem = await Media.create({ userId, mediaId, mediaType });
        res.status(201).json(mediaItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding media', error });
    }
};

// Get all media items for a user
exports.getUserMedia = async (req, res) => {
    try {
        const { userId } = req.params;
        const mediaItems = await Media.findAll({ where: { userId } });
        res.status(200).json(mediaItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving media', error });
    }
};

// Delete a media item from the user's library
exports.deleteMedia = async (req, res) => {
    try {
        const { mediaId } = req.params;
        await Media.destroy({ where: { id: mediaId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error });
    }
};