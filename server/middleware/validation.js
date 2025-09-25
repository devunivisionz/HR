// server/middleware/validation.js
const { check, validationResult } = require('express-validator');

    const validateLogin = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').exists().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateRegister = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateLogin, validateRegister };
