import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { api } from '../utils/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ balance: 0, income: 0, expense: 0 });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.getTransactions();
      setTransactions(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
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
    setStats({ balance, income, expense });
  };

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [stats.income, stats.expense],
        backgroundColor: ['#A5D6A7', '#EF5350'],
        hoverBackgroundColor: ['#81C784', '#E53935'],
      },
    ],
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Laporan Keuangan ClassKas', 20, 20);
    doc.text(`Total Saldo: Rp${stats.balance.toFixed(2)}`, 20, 40);
    doc.text(`Total Pemasukan: Rp${stats.income.toFixed(2)}`, 20, 50);
    doc.text(`Total Pengeluaran: Rp${stats.expense.toFixed(2)}`, 20, 60);
    doc.save('laporan-classkas.pdf');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Laporan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text">Saldo Saat Ini</h3>
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
      </div>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Ringkasan Pengeluaran</h3>
        <div className="w-full max-w-md mx-auto">
          <Pie data={pieData} />
        </div>
      </Card>

      <div className="text-center">
        <Button onClick={generatePDF}>Unduh Laporan sebagai PDF</Button>
      </div>
    </div>
  );
};

export default Reports;
