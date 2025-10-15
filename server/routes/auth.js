const express = require('express');
const { login, verify } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticateToken, verify);

module.exports = router;
