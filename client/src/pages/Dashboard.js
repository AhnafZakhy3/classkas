import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { api } from '../utils/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [stats, setStats] = useState({ balance: 0, income: 0, expense: 0, paidPercentage: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, remindersRes] = await Promise.all([
        api.getTransactions(),
        api.getReminders(),
      ]);
      setTransactions(transactionsRes.data);
      setReminders(remindersRes.data);
      calculateStats(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateStats = (transactions) => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += parseFloat(t.amount);
      else expense += parseFloat(t.amount);
    });
    const balance = income - expense;
    // Mock paid percentage - in real app, calculate based on students
    const paidPercentage = 75;
    setStats({ balance, income, expense, paidPercentage });
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1500, 1800, 2000, 2200, 2500],
        backgroundColor: '#A5D6A7',
      },
      {
        label: 'Expense',
        data: [800, 900, 1100, 1300, 1400, 1600],
        backgroundColor: '#EF5350',
      },
    ],
  };

  const upcomingReminders = reminders.filter(r => new Date(r.dueDate) > new Date() && r.status === 'active').slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Balance</h3>
            <p className="text-2xl font-bold text-primary">${stats.balance.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">${stats.income.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Expense</h3>
            <p className="text-2xl font-bold text-red-600">${stats.expense.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Students Paid</h3>
            <p className="text-2xl font-bold text-secondary">{stats.paidPercentage}%</p>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Monthly Income vs Expense</h3>
        <Bar data={chartData} />
      </Card>

      {/* Quick Actions and Upcoming Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/transactions">
              <Button className="w-full">+ Add Transaction</Button>
            </Link>
            <Link to="/reminders">
              <Button variant="secondary" className="w-full">+ Add Reminder</Button>
            </Link>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Upcoming Reminders</h3>
          {upcomingReminders.length > 0 ? (
            <ul className="space-y-2">
              {upcomingReminders.map(reminder => (
                <li key={reminder.id} className="flex justify-between items-center">
                  <span>{reminder.title}</span>
                  <span className="text-sm text-gray-500">{new Date(reminder.dueDate).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming reminders</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
