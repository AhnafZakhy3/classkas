const sequelize = require('../config/database');
const User = require('./User');
const Transaction = require('./Transaction');
const Reminder = require('./Reminder');

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Transaction,
  Reminder,
};

module.exports = db;
