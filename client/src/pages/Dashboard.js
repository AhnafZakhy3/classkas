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
  const [stats, setStats] = useState({ balance: 0, income: 0, expense: 0, profitPercentage: 0 });
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: Array(12).fill(0),
        backgroundColor: '#A5D6A7',
      },
      {
        label: 'Expense',
        data: Array(12).fill(0),
        backgroundColor: '#EF5350',
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, chartRes, remindersRes] = await Promise.all([
        api.getDashboardStats(),
        api.getMonthlyChartData(),
        api.getReminders(),
      ]);

      setStats(statsRes.data);
      setReminders(remindersRes.data);

      // Update chart data
      setChartData({
        labels: chartRes.data.labels,
        datasets: [
          {
            label: 'Income',
            data: chartRes.data.income,
            backgroundColor: '#A5D6A7',
          },
          {
            label: 'Expense',
            data: chartRes.data.expense,
            backgroundColor: '#EF5350',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const upcomingReminders = reminders.filter(r => new Date(r.dueDate) > new Date() && r.status === 'active').slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dasbor</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Saldo</h3>
            <p className="text-2xl font-bold text-primary">Rp{stats.balance.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Pemasukan</h3>
            <p className="text-2xl font-bold text-green-600">Rp{stats.income.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Total Pengeluaran</h3>
            <p className="text-2xl font-bold text-red-600">Rp{stats.expense.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Persentase Keuntungan (Bulan Ini)</h3>
            <p className="text-2xl font-bold text-secondary">{stats.profitPercentage}%</p>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Pemasukan vs Pengeluaran Bulanan ({new Date().getFullYear()})</h3>
        <Bar data={chartData} />
      </Card>

      {/* Quick Actions and Upcoming Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Aksi Cepat</h3>
          <div className="space-y-2">
            <Link to="/transactions">
              <Button className="w-full">+ Tambah Transaksi</Button>
            </Link>
            <Link to="/reminders">
              <Button variant="secondary" className="w-full">+ Tambah Pengingat</Button>
            </Link>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Pengingat Mendatang</h3>
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
            <p className="text-gray-500">Tidak ada pengingat mendatang</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
