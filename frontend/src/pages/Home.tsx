import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowRight, FaCode, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import api from '../api/axios';

const Home: React.FC = () => {
  const [showSupport, setShowSupport] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      await api.get('/profile');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/mpesa/stk-push', { phoneNumber, amount });
      alert('Payment request sent! Please check your phone.');
      setShowSupport(false);
      setPhoneNumber('');
      setAmount('');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Gradient Background */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="container mx-auto px-4 py-32 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Your Trusted Software Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Quality software solutions delivered with precision. Full-stack development, modern
            technologies, and innovative products across the digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center px-4"
          >
            <button
              onClick={() => setShowSupport(true)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl text-sm sm:text-base"
            >
              <FaHeart /> Support Me
            </button>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all text-sm sm:text-base"
            >
              Visit Marketplace <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            Why Choose Peter Wachanga?
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 sm:mb-16 text-base sm:text-lg px-4">
            Your success and satisfaction are my top priorities
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100 dark:border-indigo-800"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <FaCode className="text-2xl sm:text-3xl text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Clean Code
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Well-structured, maintainable code following industry best practices and modern
                standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100 dark:border-purple-800"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <FaLaptopCode className="text-2xl sm:text-3xl text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Full-Stack Expertise
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Proficient in both frontend and backend development with modern tech stacks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100 dark:border-blue-800 sm:col-span-2 lg:col-span-1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <FaChartLine className="text-2xl sm:text-3xl text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Business Growth
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Solutions focused on driving results and supporting your business objectives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">20+</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/90">Projects</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">100%</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/90">Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">3+</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/90">Years Exp</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">24/7</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/90">Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-dark-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Let&apos;s discuss how I can help bring your ideas to life with cutting-edge technology
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg text-sm sm:text-base"
            >
              Get In Touch <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 sm:p-8 max-w-md w-full border border-indigo-500 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">Support My Work</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your support helps me continue creating amazing projects!
            </p>
            <form onSubmit={handleSupport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Phone Number (M-Pesa)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254712345678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Amount (KES)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Processing...' : 'Send Payment'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSupport(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
