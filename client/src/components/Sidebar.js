import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-8">ClassKas</h2>
        <nav className="space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-3 py-2 text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            to="/transactions"
            className="flex items-center space-x-3 px-3 py-2 text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <span>💰</span>
            <span>Transactions</span>
          </Link>
          <Link
            to="/reminders"
            className="flex items-center space-x-3 px-3 py-2 text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <span>⏰</span>
            <span>Reminders</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center space-x-3 px-3 py-2 text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <span>📈</span>
            <span>Reports</span>
          </Link>
          {user?.role === 'administrator' && (
            <Link
              to="/admin"
              className="flex items-center space-x-3 px-3 py-2 text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <span>⚙️</span>
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
