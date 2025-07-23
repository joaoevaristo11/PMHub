const { body, validationResult } = require('express-validator');

const validateMediaInput = [
    body('title').notEmpty().withMessage('Title is required'),
    body('type').isIn(['movie', 'series']).withMessage('Type must be either movie or series'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('releaseDate').optional().isDate().withMessage('Release date must be a valid date'),
];

const validateUserInput = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateMediaInput,
    validateUserInput,
    handleValidationErrors,
};