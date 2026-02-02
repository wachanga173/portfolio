import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import api from '../api/axios';

interface Order {
  id: number;
  product_name: string;
  customer_name: string;
  customer_email: string;
  customer_location: string;
  phone_number: string;
  amount: number;
  result_code: number;
  result_desc: string;
  mpesa_receipt_number: string;
  transaction_date: string;
  created_at: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'successful' | 'pending' | 'failed'>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (resultCode: number) => {
    if (resultCode === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <FaCheckCircle /> Successful
        </span>
      );
    } else if (resultCode === -1) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Pending
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <FaTimesCircle /> Failed
        </span>
      );
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'successful') return order.result_code === 0;
    if (filter === 'pending') return order.result_code === -1;
    if (filter === 'failed') return order.result_code !== 0 && order.result_code !== -1;
    return true;
  });

  const totalRevenue = orders
    .filter((o) => o.result_code === 0)
    .reduce((sum, o) => sum + o.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-20">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title">Customer Orders</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="text-primary-500 text-3xl mb-2">
                <FaShoppingCart />
              </div>
              <div className="text-2xl font-bold">{orders.length}</div>
              <div className="text-gray-400">Total Orders</div>
            </div>
            <div className="card">
              <div className="text-green-500 text-3xl mb-2">
                <FaCheckCircle />
              </div>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.result_code === 0).length}
              </div>
              <div className="text-gray-400">Successful</div>
            </div>
            <div className="card">
              <div className="text-yellow-500 text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.result_code === -1).length}
              </div>
              <div className="text-gray-400">Pending</div>
            </div>
            <div className="card">
              <div className="text-primary-500 text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</div>
              <div className="text-gray-400">Revenue</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('successful')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'successful'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              Successful
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'pending'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'failed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              Failed
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-400">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{order.product_name}</h3>
                        {getStatusBadge(order.result_code)}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm text-gray-400 mb-2">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">👤 {order.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaEnvelope /> {order.customer_email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaPhone /> {order.phone_number}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaMapMarkerAlt /> {order.customer_location}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm text-gray-400 mb-2">Transaction Details</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-400">Amount:</span>{' '}
                              <span className="font-semibold text-primary-500">
                                KES {order.amount.toLocaleString()}
                              </span>
                            </div>
                            {order.mpesa_receipt_number && (
                              <div>
                                <span className="text-gray-400">Receipt:</span>{' '}
                                <span className="font-mono">{order.mpesa_receipt_number}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-400">Date:</span>{' '}
                              {new Date(order.created_at).toLocaleString()}
                            </div>
                            {order.result_code !== 0 && order.result_code !== -1 && (
                              <div className="text-red-400">
                                <span className="text-gray-400">Reason:</span> {order.result_desc}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrders;
