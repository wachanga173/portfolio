import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEnvelope, FaUser, FaPhone, FaTrash } from 'react-icons/fa';
import api from '../api/axios';

interface FeedbackSubmission {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminFeedback: React.FC = () => {
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await api.get('/contact/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      await api.delete(`/contact/submissions/${id}`);
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-20">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <FaEnvelope className="text-4xl text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="section-title text-left mb-0">User Feedback</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                View feedback from users. Contact details are optional.
              </p>
            </div>
          </div>

          <div className="mb-6 card">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {submissions.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Submissions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {
                    submissions.filter(
                      (s) => new Date(s.created_at).toDateString() === new Date().toDateString()
                    ).length
                  }
                </div>
                <div className="text-gray-600 dark:text-gray-400">Today</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {
                    submissions.filter((s) => {
                      const date = new Date(s.created_at);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return date >= weekAgo;
                    }).length
                  }
                </div>
                <div className="text-gray-600 dark:text-gray-400">This Week</div>
              </div>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No contact submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUser className="text-gray-500 dark:text-gray-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {submission.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(submission.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <FaEnvelope />
                          <a
                            href={`mailto:${submission.email}`}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2">
                            <FaPhone />
                            <a
                              href={`tel:${submission.phone}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {submission.phone}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Subject:
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                          {submission.subject}
                        </span>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(submission.id)}
                      className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminFeedback;
