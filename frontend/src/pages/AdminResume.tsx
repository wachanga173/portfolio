import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ResumeManager from '../components/admin/ResumeManager';

const AdminResume: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-20">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <ResumeManager />
      </div>
    </div>
  );
};

export default AdminResume;
