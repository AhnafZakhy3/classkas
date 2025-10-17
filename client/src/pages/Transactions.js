import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from '../utils/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    type: 'income',
    amount: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.getTransactions();
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await api.updateTransaction(editingTransaction.id, formData);
      } else {
        await api.createTransaction(formData);
      }
      fetchTransactions();
      setIsModalOpen(false);
      setEditingTransaction(null);
      setFormData({ date: '', description: '', type: 'income', amount: '' });
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      date: transaction.date.split('T')[0],
      description: transaction.description,
      type: transaction.type,
      amount: transaction.amount,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (transaction) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      try {
        await api.deleteTransaction(transaction.id);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const headers = ['Tanggal', 'Deskripsi', 'Tipe', 'Jumlah'];

  const tableData = transactions.map(t => ({
    tanggal: new Date(t.date).toLocaleDateString(),
    deskripsi: t.description,
    tipe: <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>{t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span>,
    jumlah: `Rp${parseFloat(t.amount).toFixed(2)}`,
  }));

  const actions = (row, index) => {
    const transaction = transactions[index];
    return (
      <div className="space-x-2">
        <Button onClick={() => handleEdit(transaction)} variant="secondary">Edit</Button>
        <Button onClick={() => handleDelete(transaction)} variant="danger">Hapus</Button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transaksi</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Tambah Transaksi</Button>
      </div>

      <Table headers={headers} data={tableData} actions={actions} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
          setFormData({ date: '', description: '', type: 'income', amount: '' });
        }}
        title={editingTransaction ? 'Edit Transaksi' : 'Tambah Transaksi'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Tanggal"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Input
            label="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Masukkan deskripsi"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <Input
            label="Jumlah"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Masukkan jumlah"
            required
          />
          <Button type="submit" className="w-full">
            {editingTransaction ? 'Perbarui' : 'Tambah'} Transaksi
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Transactions;
