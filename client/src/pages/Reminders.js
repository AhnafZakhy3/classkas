import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from '../utils/api';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'active',
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await api.getReminders();
      setReminders(res.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReminder) {
        await api.updateReminder(editingReminder.id, formData);
      } else {
        await api.createReminder(formData);
      }
      fetchReminders();
      setIsModalOpen(false);
      setEditingReminder(null);
      setFormData({ title: '', description: '', dueDate: '', status: 'active' });
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setFormData({
      title: reminder.title,
      description: reminder.description,
      dueDate: reminder.dueDate.split('T')[0],
      status: reminder.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengingat ini?')) {
      try {
        await api.deleteReminder(id);
        fetchReminders();
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  const toggleStatus = async (reminder) => {
    try {
      await api.updateReminder(reminder.id, { ...reminder, status: reminder.status === 'active' ? 'done' : 'active' });
      fetchReminders();
    } catch (error) {
      console.error('Error updating reminder status:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pengingat</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Tambah Pengingat</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map(reminder => (
          <Card key={reminder.id} className={`border-l-4 ${reminder.status === 'active' ? 'border-l-primary' : 'border-l-secondary'}`}>
            <h3 className="text-lg font-semibold mb-2">{reminder.title}</h3>
            <p className="text-gray-600 mb-2">{reminder.description}</p>
            <p className="text-sm text-gray-500 mb-4">Jatuh Tempo: {new Date(reminder.dueDate).toLocaleDateString()}</p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${reminder.status === 'active' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                {reminder.status === 'active' ? 'Aktif' : 'Selesai'}
              </span>
              <div className="space-x-2">
                <Button onClick={() => toggleStatus(reminder)} variant="secondary" size="sm">
                  {reminder.status === 'active' ? 'Tandai Selesai' : 'Tandai Aktif'}
                </Button>
                <Button onClick={() => handleEdit(reminder)} variant="secondary" size="sm">Edit</Button>
                <Button onClick={() => handleDelete(reminder.id)} variant="danger" size="sm">Hapus</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReminder(null);
          setFormData({ title: '', description: '', dueDate: '', status: 'active' });
        }}
        title={editingReminder ? 'Edit Pengingat' : 'Tambah Pengingat'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Judul"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Masukkan judul"
            required
          />
          <Input
            label="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Masukkan deskripsi"
          />
          <Input
            label="Tanggal Jatuh Tempo"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="active">Aktif</option>
              <option value="done">Selesai</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            {editingReminder ? 'Perbarui' : 'Tambah'} Pengingat
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Reminders;
