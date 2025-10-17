const express = require('express');
const {
  getTransactions,
  getDashboardStats,
  getMonthlyChartData,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTransactions);
router.get('/stats', getDashboardStats);
router.get('/chart', getMonthlyChartData);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
