import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaLightbulb, FaClock } from 'react-icons/fa';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  icon: any;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    date: 'January 28, 2026',
    category: 'Tutorial',
    excerpt:
      'Learn best practices for building large-scale React applications that can grow with your business.',
    content:
      'In this guide, we explore component architecture, state management patterns, and performance optimization techniques...',
    icon: FaCode,
  },
  {
    id: 2,
    title: 'M-Pesa Integration Made Simple',
    date: 'January 25, 2026',
    category: 'Integration',
    excerpt:
      'Step-by-step guide to integrating M-Pesa payment gateway into your Node.js application.',
    content:
      "M-Pesa is Kenya's leading mobile money platform. Here's how to integrate it seamlessly...",
    icon: FaRocket,
  },
  {
    id: 3,
    title: 'TypeScript Tips for Beginners',
    date: 'January 20, 2026',
    category: 'Tips & Tricks',
    excerpt:
      'Essential TypeScript patterns that will make your code more maintainable and bug-free.',
    content: 'TypeScript adds static typing to JavaScript, catching errors before runtime...',
    icon: FaLightbulb,
  },
  {
    id: 4,
    title: 'Dark Mode Implementation Guide',
    date: 'January 15, 2026',
    category: 'Tutorial',
    excerpt:
      'Implement dark mode in your React app with Tailwind CSS and localStorage persistence.',
    content: "Dark mode is no longer optional. Here's how to implement it properly...",
    icon: FaCode,
  },
  {
    id: 5,
    title: 'Database Design Best Practices',
    date: 'January 10, 2026',
    category: 'Database',
    excerpt: 'Essential principles for designing efficient and scalable database schemas.',
    content: 'Good database design is crucial for application performance and maintainability...',
    icon: FaRocket,
  },
  {
    id: 6,
    title: 'API Security Essentials',
    date: 'January 5, 2026',
    category: 'Security',
    excerpt: 'Protect your APIs with these essential security practices and patterns.',
    content: 'Security should be built into your API from day one. Here are the essentials...',
    icon: FaLightbulb,
  },
];

const DevNews: React.FC = () => {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dev News & Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Latest tutorials, tips, and insights from my development journey
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                      {item.category}
                    </span>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FaClock className="mr-2" />
                    {item.date}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">{item.excerpt}</p>

                  <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest tutorials, tips, and insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevNews;
