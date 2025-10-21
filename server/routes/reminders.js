const express = require('express');
const { getReminders, createReminder, updateReminder, deleteReminder } = require('../controllers/reminderController');
const { authenticateToken, authorizeTreasurer } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getReminders);
router.post('/', authorizeTreasurer, createReminder);
router.put('/:id', authorizeTreasurer, updateReminder);
router.delete('/:id', authorizeTreasurer, deleteReminder);

module.exports = router;
