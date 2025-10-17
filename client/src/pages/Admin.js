import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Table from '../components/Table';

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'siswa'
  });

  useEffect(() => {
    if (user?.role !== 'administrator') {
      return;
    }
    fetchUsers();
    fetchRoles();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
      } else {
        await api.createUser(formData);
      }
      fetchUsers();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await api.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'siswa'
    });
    setEditingUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (user?.role !== 'administrator') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Akses Ditolak</h2>
        <p className="text-gray-600 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    );
  }

  const columns = [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Kata Sandi' },
    { key: 'role', label: 'Peran' },
    { key: 'createdAt', label: 'Dibuat', render: (value) => new Date(value).toLocaleDateString() },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, user) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => handleEdit(user)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Hapus
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Panel Admin - Manajemen Pengguna</h1>
        <Button onClick={openCreateModal} className="bg-primary hover:bg-primary-dark">
          Tambah Pengguna Baru
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Memuat...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(user[column.key], user) : user[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold mb-4">
          {editingUser ? 'Edit Pengguna' : 'Buat Pengguna Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {!editingUser && (
            <Input
              label="Kata Sandi"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peran</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              {roles.length > 0 ? (
                roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'administrator' ? 'Administrator' :
                     role === 'bendahara' ? 'Bendahara' :
                     role === 'siswa' ? 'Siswa' : role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))
              ) : (
                <>
                  <option value="administrator">Administrator</option>
                  <option value="bendahara">Bendahara</option>
                  <option value="siswa">Siswa</option>
                </>
              )}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Batal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">
              {editingUser ? 'Perbarui' : 'Buat'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Admin;
