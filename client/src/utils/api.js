import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Add request interceptor to include auth token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),

  // Transactions
  getTransactions: () => axios.get(`${API_BASE_URL}/transactions`),
  createTransaction: (data) => axios.post(`${API_BASE_URL}/transactions`, data),
  updateTransaction: (id, data) => axios.put(`${API_BASE_URL}/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${API_BASE_URL}/transactions/${id}`),

  // Reminders
  getReminders: () => axios.get(`${API_BASE_URL}/reminders`),
  createReminder: (data) => axios.post(`${API_BASE_URL}/reminders`, data),
  updateReminder: (id, data) => axios.put(`${API_BASE_URL}/reminders/${id}`, data),
  deleteReminder: (id) => axios.delete(`${API_BASE_URL}/reminders/${id}`),

  // Admin
  getUsers: () => axios.get(`${API_BASE_URL}/admin/users`),
  createUser: (data) => axios.post(`${API_BASE_URL}/admin/users`, data),
  updateUser: (id, data) => axios.put(`${API_BASE_URL}/admin/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${API_BASE_URL}/admin/users/${id}`),
  getRoles: () => axios.get(`${API_BASE_URL}/admin/roles`),
};

export default api;
