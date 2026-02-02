import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaDatabase, FaUserSecret, FaEnvelope } from 'react-icons/fa';

const Privacy: React.FC = () => {
  const content = `
    <h2>Privacy Policy</h2>
    <p><strong>Effective Date:</strong> February 2, 2026</p>
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    
    <p>This Privacy Policy describes how Peter Wachanga ("we," "us," or "our") collects, uses, and protects your personal information when you visit and interact with our portfolio website.</p>
    
    <h3>1. Information We Collect</h3>
    
    <h4>1.1 Information You Provide Directly</h4>
    <ul>
      <li><strong>Contact Form Submissions:</strong> When you submit a contact form, we collect your name, email address, phone number (optional), subject, and message content.</li>
      <li><strong>Chatbot Interactions:</strong> Messages sent through our feedback chatbot are stored with the subject "Chatbot Feedback" along with your message content.</li>
      <li><strong>Payment Information:</strong> When making purchases through our marketplace, we collect your name, email, phone number, location, and the product/service you're purchasing. Phone numbers are sanitized and partially masked in logs for security.</li>
      <li><strong>Admin Account:</strong> Admin users provide email and password credentials for authentication purposes.</li>
    </ul>
    
    <h4>1.2 Information Collected Automatically</h4>
    <ul>
      <li><strong>IP Address:</strong> Your IP address is logged for security monitoring, rate limiting, and fraud prevention.</li>
      <li><strong>Browser Information:</strong> User-agent strings are collected to understand browser compatibility and detect potential security threats.</li>
      <li><strong>Request Logs:</strong> HTTP method, path, timestamp, response status codes, and request duration are logged for performance monitoring and security auditing.</li>
      <li><strong>Authentication Tokens:</strong> JWT tokens are stored in your browser's local storage to maintain login sessions (24-hour expiration).</li>
    </ul>
    
    <h4>1.3 Payment Processing Data</h4>
    <ul>
      <li><strong>M-Pesa Transactions:</strong> We process payments through Safaricom M-Pesa. We store transaction IDs (MerchantRequestID, CheckoutRequestID), phone numbers (partially masked), amounts, receipt numbers, transaction dates, and transaction status.</li>
      <li><strong>Payment Logs:</strong> All payment attempts, successes, and failures are logged with timestamps for auditing and customer support purposes.</li>
    </ul>
    
    <h3>2. How We Use Your Information</h3>
    
    <h4>2.1 Primary Uses</h4>
    <ul>
      <li><strong>Communication:</strong> To respond to your inquiries submitted through contact forms or the chatbot.</li>
      <li><strong>Order Processing:</strong> To process and fulfill orders for products and services purchased through our marketplace.</li>
      <li><strong>Payment Processing:</strong> To initiate and verify M-Pesa payment transactions.</li>
      <li><strong>Customer Support:</strong> To provide support related to orders, payments, or general inquiries.</li>
      <li><strong>Authentication:</strong> To verify admin identity and maintain secure access to administrative functions.</li>
    </ul>
    
    <h4>2.2 Security and Fraud Prevention</h4>
    <ul>
      <li><strong>Rate Limiting:</strong> IP addresses are monitored to prevent abuse (max 100 API requests per 15 minutes, 5 payment requests per 15 minutes, 5 login attempts per 15 minutes).</li>
      <li><strong>Security Monitoring:</strong> Logs track unauthorized access attempts, failed login attempts, rate limit violations, and other suspicious activities.</li>
      <li><strong>Audit Trails:</strong> Sensitive operations including logins, password changes, and admin actions are logged with user IDs and timestamps.</li>
      <li><strong>IP Whitelisting:</strong> M-Pesa callback endpoints use IP verification to ensure requests originate from authorized sources.</li>
    </ul>
    
    <h3>3. Data Security</h3>
    
    <p>We implement industry-standard security measures to protect your information:</p>
    
    <ul>
      <li><strong>Encryption:</strong> Sensitive data is encrypted using AES-256-GCM encryption with a 32-character encryption key.</li>
      <li><strong>Password Security:</strong> Admin passwords are hashed using bcrypt (10 salt rounds) before storage. Passwords must be at least 8 characters long.</li>
      <li><strong>JWT Authentication:</strong> Admin sessions use JSON Web Tokens with 24-hour expiration.</li>
      <li><strong>HTTPS/TLS:</strong> All data transmission is secured using HTTPS with HTTP Strict Transport Security (HSTS) enabled for 1 year.</li>
      <li><strong>Helmet.js Security:</strong> Content Security Policy (CSP), XSS protection, and other HTTP security headers are enforced.</li>
      <li><strong>Request Size Limits:</strong> JSON and form submissions are limited to 10KB to prevent denial-of-service attacks.</li>
      <li><strong>CORS Protection:</strong> Cross-origin requests are restricted to authorized frontend domains only.</li>
    </ul>
    
    <h3>4. Data Storage and Retention</h3>
    
    <ul>
      <li><strong>Database Storage:</strong> Personal data is stored in a MySQL database (portfolio database) hosted locally or on authorized servers.</li>
      <li><strong>Log Files:</strong> Security logs, payment logs, and audit logs are stored in the backend/logs directory on our server.</li>
      <li><strong>Local Storage:</strong> Authentication tokens are stored in your browser's local storage until logout or token expiration (24 hours).</li>
      <li><strong>Retention Period:</strong> Contact submissions and payment records are retained indefinitely for business records and customer support. You may request deletion by contacting us.</li>
    </ul>
    
    <h3>5. Third-Party Services</h3>
    
    <h4>5.1 M-Pesa (Safaricom)</h4>
    <p>We use Safaricom M-Pesa for payment processing. When you make a payment:</p>
    <ul>
      <li>Your phone number and payment amount are transmitted to M-Pesa's API (sandbox: sandbox.safaricom.co.ke).</li>
      <li>M-Pesa sends payment status callbacks to our server.</li>
      <li>M-Pesa's privacy policy governs their handling of your payment information.</li>
      <li>We verify M-Pesa callback authenticity using IP whitelisting and signature verification.</li>
    </ul>
    
    <h4>5.2 Font Services</h4>
    <p>We load fonts from Google Fonts (fonts.googleapis.com and fonts.gstatic.com). Google may collect analytics data according to their privacy policy.</p>
    
    <h3>6. Cookies and Local Storage</h3>
    
    <ul>
      <li><strong>Authentication Token:</strong> JWT tokens are stored in local storage under the key "token" to maintain admin login sessions.</li>
      <li><strong>No Tracking Cookies:</strong> We do not use third-party tracking cookies or analytics services.</li>
      <li><strong>Session Management:</strong> Your browser must support local storage for admin authentication to function.</li>
    </ul>
    
    <h3>7. Data Sharing and Disclosure</h3>
    
    <p>We do not sell, rent, or share your personal information with third parties except:</p>
    
    <ul>
      <li><strong>Payment Processing:</strong> Phone numbers and amounts are shared with M-Pesa to process payments.</li>
      <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government request.</li>
      <li><strong>Security Threats:</strong> We may share information to investigate fraud, security incidents, or violations of our terms.</li>
    </ul>
    
    <h3>8. Your Rights</h3>
    
    <p>You have the right to:</p>
    
    <ul>
      <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
      <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements).</li>
      <li><strong>Objection:</strong> Object to processing of your data for specific purposes.</li>
      <li><strong>Portability:</strong> Request your data in a structured, machine-readable format.</li>
    </ul>
    
    <p>To exercise these rights, contact us at: <strong>wachangapeter763@gmail.com</strong></p>
    
    <h3>9. Security Incident Logging</h3>
    
    <p>For transparency and accountability, we log the following security events:</p>
    
    <ul>
      <li>Failed login attempts (user not found or invalid password)</li>
      <li>Unauthorized access attempts (401/403 responses)</li>
      <li>Rate limit violations (429 responses)</li>
      <li>Error responses (4xx/5xx status codes)</li>
      <li>Password change attempts (successful and failed)</li>
      <li>Payment transactions (initiated, successful, failed)</li>
      <li>M-Pesa callback authenticity failures</li>
    </ul>
    
    <p>These logs include timestamps, IP addresses, and event details but exclude sensitive credentials.</p>
    
    <h3>10. Children's Privacy</h3>
    
    <p>Our website is not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If we discover we have collected data from a minor, we will delete it promptly.</p>
    
    <h3>11. International Data Transfers</h3>
    
    <p>Your data is processed and stored in Kenya. If you access our website from outside Kenya, your data may be transferred to and processed in Kenya, which may have different data protection laws than your jurisdiction.</p>
    
    <h3>12. Changes to This Privacy Policy</h3>
    
    <p>We may update this Privacy Policy periodically. The "Last Updated" date at the top indicates when changes were last made. Significant changes will be communicated through prominent notice on our website.</p>
    
    <h3>13. Data Protection Officer</h3>
    
    <p>For privacy-related questions or concerns, contact:</p>
    <p><strong>Peter Wachanga</strong><br>
    Email: wachangapeter763@gmail.com<br>
    Role: Website Owner & Data Controller</p>
    
    <h3>14. Technical Details</h3>
    
    <p>For transparency, our security implementation includes:</p>
    <ul>
      <li>Server Environment: Node.js with Express.js framework</li>
      <li>Database: MySQL with parameterized queries (SQL injection protection)</li>
      <li>Encryption Algorithm: AES-256-GCM</li>
      <li>Password Hashing: bcrypt with 10 rounds</li>
      <li>Session Management: JWT with HS256 algorithm</li>
      <li>HSTS Max-Age: 31,536,000 seconds (1 year) with includeSubDomains and preload</li>
      <li>Rate Limiting: Express-rate-limit with configurable windows and thresholds</li>
    </ul>
    
    <h3>15. Contact Information</h3>
    
    <p>For questions about this Privacy Policy or to exercise your data rights:</p>
    <ul>
      <li><strong>Email:</strong> wachangapeter763@gmail.com</li>
      <li><strong>Contact Form:</strong> Available on our Contact page</li>
      <li><strong>Chatbot:</strong> Use our feedback assistant for quick inquiries</li>
    </ul>
    
    <p><em>By using this website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</em></p>
  `;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container-custom py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl">
              <FaShieldAlt className="text-white text-5xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            <strong>Effective Date:</strong> February 2, 2026 • <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            This Privacy Policy describes how Peter Wachanga collects, uses, and protects your personal information when you visit and interact with our portfolio website.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Section 1: Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                <FaDatabase className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3">1.1 Information You Provide Directly</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-2"><span className="text-indigo-500 mt-1">•</span><span><strong>Contact Form Submissions:</strong> Name, email, phone number (optional), subject, and message content.</span></li>
                  <li className="flex gap-2"><span className="text-indigo-500 mt-1">•</span><span><strong>Chatbot Interactions:</strong> Messages stored with subject "Chatbot Feedback".</span></li>
                  <li className="flex gap-2"><span className="text-indigo-500 mt-1">•</span><span><strong>Payment Information:</strong> Name, email, phone number, location, and product/service details. Phone numbers are sanitized and partially masked.</span></li>
                  <li className="flex gap-2"><span className="text-indigo-500 mt-1">•</span><span><strong>Admin Account:</strong> Email and password credentials for authentication.</span></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3">1.2 Information Collected Automatically</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-2"><span className="text-purple-500 mt-1">•</span><span><strong>IP Address:</strong> Logged for security monitoring, rate limiting, and fraud prevention.</span></li>
                  <li className="flex gap-2"><span className="text-purple-500 mt-1">•</span><span><strong>Browser Information:</strong> User-agent strings for compatibility and security.</span></li>
                  <li className="flex gap-2"><span className="text-purple-500 mt-1">•</span><span><strong>Request Logs:</strong> HTTP method, path, timestamps, response codes, and duration.</span></li>
                  <li className="flex gap-2"><span className="text-purple-500 mt-1">•</span><span><strong>Authentication Tokens:</strong> JWT tokens (24-hour expiration).</span></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3">1.3 Payment Processing Data</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex gap-2"><span className="text-green-500 mt-1">•</span><span><strong>M-Pesa Transactions:</strong> Transaction IDs, phone numbers (masked), amounts, receipts, dates, and status.</span></li>
                  <li className="flex gap-2"><span className="text-green-500 mt-1">•</span><span><strong>Payment Logs:</strong> All attempts, successes, and failures with timestamps.</span></li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 2: How We Use Your Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <FaUserSecret className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">2. How We Use Your Information</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Primary Uses</h3>
                <p className="mb-2">We use your information to:</p>
                <ul className="space-y-1 ml-4">
                  <li>✓ Respond to contact form and chatbot inquiries</li>
                  <li>✓ Process and fulfill marketplace orders</li>
                  <li>✓ Initiate and verify M-Pesa payments</li>
                  <li>✓ Provide customer support</li>
                  <li>✓ Verify admin identity and maintain secure access</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2 mt-4">Security & Fraud Prevention</h3>
                <p className="mb-2">Your data helps us:</p>
                <ul className="space-y-1 ml-4">
                  <li>✓ Rate limit requests (100 API/15min, 5 payments/15min, 5 logins/15min)</li>
                  <li>✓ Monitor unauthorized access and failed login attempts</li>
                  <li>✓ Create audit trails for sensitive operations</li>
                  <li>✓ Verify M-Pesa callbacks via IP whitelisting</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <FaLock className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">3. Data Security</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">Encryption</h4>
                <p className="text-sm">AES-256-GCM encryption for sensitive data with 32-character keys</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">Password Security</h4>
                <p className="text-sm">Bcrypt hashing (10 rounds), minimum 8 characters</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">Authentication</h4>
                <p className="text-sm">JWT tokens with 24-hour expiration</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">Transport Security</h4>
                <p className="text-sm">HTTPS/TLS with HSTS (1-year max-age)</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">HTTP Headers</h4>
                <p className="text-sm">Helmet.js with CSP and XSS protection</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-green-400 mb-2">Request Protection</h4>
                <p className="text-sm">10KB size limits, CORS restrictions, SQL injection protection</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-center"
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-white/90 mb-4 max-w-2xl mx-auto">
              For privacy-related questions, to exercise your data rights, or report concerns, contact us at:
            </p>
            <a
              href="mailto:wachangapeter763@gmail.com"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              wachangapeter763@gmail.com
            </a>
            <p className="text-white/80 text-sm mt-4">
              You can also reach us through the Contact page or Chatbot
            </p>
          </motion.div>

          {/* Additional Info - Collapsible Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-400 text-sm"
          >
            <p className="mb-2">📍 Data Controller: Peter Wachanga • 🌍 Location: Kenya</p>
            <p>🔐 Encryption: AES-256-GCM • 🔑 JWT: HS256 • 🛡️ HSTS: 1 year</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
