import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fa';
import api from '../api/axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
  image_url?: string;
}

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.FaShoppingCart;
    return IconComponent;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    try {
      await api.post('/mpesa/stk-push', {
        phoneNumber,
        amount: selectedProduct.price.toString(),
        customerName,
        customerEmail,
        customerLocation,
        productName: selectedProduct.name,
      });
      alert('Payment request sent! Please check your phone.');
      setSelectedProduct(null);
      setPhoneNumber('');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerLocation('');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Services Marketplace
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional software development services with M-Pesa payment integration
          </p>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => {
              const Icon = getIconComponent(product.icon);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl">
                      <Icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        KES {product.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-shadow"
                    >
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Purchase
            </h3>
            <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProduct.name}</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                KES {selectedProduct.price.toLocaleString()}
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Location *
                </label>
                <input
                  type="text"
                  value={customerLocation}
                  onChange={(e) => setCustomerLocation(e.target.value)}
                  placeholder="City, County"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  M-Pesa Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254712345678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                * Your information will be used for transfer of ownership and maintenance cost
                discussions.
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pay with M-Pesa'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
