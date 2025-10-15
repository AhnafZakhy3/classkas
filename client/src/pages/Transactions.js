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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.deleteTransaction(id);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const headers = ['Date', 'Description', 'Type', 'Amount'];

  const tableData = transactions.map(t => ({
    date: new Date(t.date).toLocaleDateString(),
    description: t.description,
    type: <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>{t.type}</span>,
    amount: `$${parseFloat(t.amount).toFixed(2)}`,
  }));

  const actions = (row) => {
    const transaction = transactions.find(t => t.date === row.date.split('T')[0] && t.description === row.description);
    return (
      <div className="space-x-2">
        <Button onClick={() => handleEdit(transaction)} variant="secondary">Edit</Button>
        <Button onClick={() => handleDelete(transaction.id)} variant="danger">Delete</Button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Transaction</Button>
      </div>

      <Table headers={headers} data={tableData} actions={actions} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
          setFormData({ date: '', description: '', type: 'income', amount: '' });
        }}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            required
          />
          <Button type="submit" className="w-full">
            {editingTransaction ? 'Update' : 'Add'} Transaction
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Transactions;
