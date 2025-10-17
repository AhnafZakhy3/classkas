const { Transaction, User } = require('../models');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Get all transactions for current month
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id,
        [require('sequelize').Op.and]: [
          require('sequelize').where(require('sequelize').fn('MONTH', require('sequelize').col('date')), currentMonth),
          require('sequelize').where(require('sequelize').fn('YEAR', require('sequelize').col('date')), currentYear)
        ]
      }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += parseFloat(t.amount);
      else expense += parseFloat(t.amount);
    });

    const balance = income - expense;
    const profitPercentage = income > 0 ? ((income - expense) / income * 100) : 0;

    res.json({
      balance,
      income,
      expense,
      profitPercentage: Math.round(profitPercentage * 100) / 100
    });
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMonthlyChartData = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Get transactions for current year grouped by month
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id,
        [require('sequelize').Op.and]: [
          require('sequelize').where(require('sequelize').fn('YEAR', require('sequelize').col('date')), currentYear)
        ]
      },
      order: [['date', 'ASC']]
    });

    // Initialize monthly data
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);

    transactions.forEach(t => {
      const month = new Date(t.date).getMonth();
      if (t.type === 'income') {
        monthlyIncome[month] += parseFloat(t.amount);
      } else {
        monthlyExpense[month] += parseFloat(t.amount);
      }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.json({
      labels: monthNames,
      income: monthlyIncome,
      expense: monthlyExpense
    });
  } catch (error) {
    console.error('Error getting monthly chart data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { date, description, type, amount } = req.body;
    const transaction = await Transaction.create({
      date,
      description,
      type,
      amount,
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, type, amount } = req.body;

    const transaction = await Transaction.findOne({
      where: { id, userId: req.user.id },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.update({ date, description, type, amount });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id, userId: req.user.id },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTransactions,
  getDashboardStats,
  getMonthlyChartData,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
