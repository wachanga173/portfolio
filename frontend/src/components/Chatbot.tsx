import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm your feedback assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isSubmitting) return;

    const userMessage = input.trim();
    // Add user message
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsSubmitting(true);

    try {
      // Submit to backend
      await api.post('/contact', {
        subject: 'Chatbot Feedback',
        message: userMessage,
      });

      // Simple auto-responses
      setTimeout(() => {
        let response = "Thank you for your message! Your feedback has been saved and Peter will review it.";

        if (userMessage.toLowerCase().includes('project') || userMessage.toLowerCase().includes('hire')) {
          response =
            'Interested in working together? Your message has been saved. You can also use the Contact page for more details!';
        } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
          response = 'Your pricing inquiry has been saved. Peter will review it and get back to you if you provided contact details.';
        } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support')) {
          response =
            "Your support request has been saved. For urgent matters, please reach out via the Contact page with your email.";
        }

        setMessages((prev) => [...prev, { text: response, isUser: false }]);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error sending your message. Please try again or use the Contact page.',
          isUser: false,
        },
      ]);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-shadow z-50"
        aria-label="Open feedback chat"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
              <h3 className="text-lg font-semibold">Feedback Assistant</h3>
              <p className="text-sm text-white/80">We&apos;d love to hear from you!</p>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
