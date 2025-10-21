const express = require('express');
const {
  getTransactions,
  getDashboardStats,
  getMonthlyChartData,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { authenticateToken, authorizeTreasurer } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTransactions);
router.get('/stats', getDashboardStats);
router.get('/chart', getMonthlyChartData);
router.post('/', authorizeTreasurer, createTransaction);
router.put('/:id', authorizeTreasurer, updateTransaction);
router.delete('/:id', authorizeTreasurer, deleteTransaction);

module.exports = router;
