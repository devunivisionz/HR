// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
  const { validateLogin } = require('../middleware/validation');

router.post('/login', validateLogin, authController.login);
router.post('/register', authController.register);
router.get('/verify', authController.verifyToken);

module.exports = router;
