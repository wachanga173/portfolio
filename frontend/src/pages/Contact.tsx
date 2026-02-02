import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message) {
      toast.error('Subject and message are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', formData);
      toast.success('Feedback submitted successfully! Thank you for reaching out.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Get In Touch
        </motion.h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold gradient-text mb-6">Let&apos;s Work Together</h2>
            <p className="text-gray-400 mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to
              be part of your visions.
            </p>

            <div className="space-y-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="card flex items-center gap-4 hover:border-primary-500 transition-colors"
                >
                  <FaEnvelope className="text-3xl text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                </a>
              )}

              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="card flex items-center gap-4 hover:border-primary-500 transition-colors"
                >
                  <FaPhone className="text-3xl text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-semibold">{profile.phone}</p>
                  </div>
                </a>
              )}

              {profile?.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 hover:border-primary-500 transition-colors"
                >
                  <FaWhatsapp className="text-3xl text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <p className="font-semibold">Chat with me</p>
                  </div>
                </a>
              )}

              <div className="card flex items-center gap-4">
                <FaMapMarkerAlt className="text-3xl text-primary-500" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-semibold">Kenya</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map or Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-bold gradient-text mb-6">Send Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Brief subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  placeholder="Your feedback or message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane /> Send Feedback
                  </>
                )}
              </button>

              <p className="text-sm text-gray-400 text-center">
                Contact details are optional. Include them only if you want a response.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
