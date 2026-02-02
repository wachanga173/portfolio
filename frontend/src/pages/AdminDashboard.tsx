import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaProjectDiagram,
  FaTools,
  FaFileUpload,
  FaSignOutAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const dashboardItems = [
    {
      title: 'Profile Management',
      icon: FaUser,
      path: '/admin/profile',
      description: 'Update profile information',
    },
    {
      title: 'About Me',
      icon: FaInfoCircle,
      path: '/admin/about',
      description: 'Edit About page content',
    },
    {
      title: 'Projects',
      icon: FaProjectDiagram,
      path: '/admin/projects',
      description: 'Manage your projects',
    },
    { title: 'Skills', icon: FaTools, path: '/admin/skills', description: 'Add and edit skills' },
    {
      title: 'Resume',
      icon: FaFileUpload,
      path: '/admin/resume',
      description: 'Edit resume sections',
    },
    {
      title: 'Customer Orders',
      icon: FaShoppingCart,
      path: '/admin/orders',
      description: 'View marketplace orders',
    },
    {
      title: 'Marketplace Products',
      icon: FaBoxOpen,
      path: '/admin/products',
      description: 'Manage marketplace products',
    },
    {
      title: 'Contact Feedback',
      icon: FaEnvelope,
      path: '/admin/feedback',
      description: 'View contact submissions',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="section-title text-left mb-0">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.path} className="card hover:border-primary-500 block h-full">
                <item.icon className="text-5xl text-primary-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <h3 className="text-4xl font-bold gradient-text mb-2">Active</h3>
            <p className="text-gray-400">System Status</p>
          </div>
          <div className="card text-center">
            <h3 className="text-4xl font-bold gradient-text mb-2">Secure</h3>
            <p className="text-gray-400">AES-256 Encryption</p>
          </div>
          <div className="card text-center">
            <h3 className="text-4xl font-bold gradient-text mb-2">Ready</h3>
            <p className="text-gray-400">Backend API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
