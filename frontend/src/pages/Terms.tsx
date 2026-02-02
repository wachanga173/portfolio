import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaShoppingCart, FaMoneyBillWave, FaUserShield, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';

const Terms: React.FC = () => {
  const content = `
    <h2>Terms and Conditions</h2>
    <p><strong>Effective Date:</strong> February 2, 2026</p>
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    
    <p>Welcome to Peter Wachanga's Portfolio Website. These Terms and Conditions ("Terms") govern your access to and use of our website and services. By accessing or using this website, you agree to be bound by these Terms.</p>
    
    <h3>1. Acceptance of Terms</h3>
    
    <p>By accessing this portfolio website, submitting contact forms, using the chatbot, making purchases through our marketplace, or processing payments via M-Pesa, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</p>
    
    <p>If you do not agree with any part of these Terms, you must not use our website or services.</p>
    
    <h3>2. Definitions</h3>
    
    <ul>
      <li><strong>"Website"</strong> refers to Peter Wachanga's portfolio website and all associated services.</li>
      <li><strong>"User," "You," "Your"</strong> refers to any individual or entity accessing the website.</li>
      <li><strong>"We," "Us," "Our"</strong> refers to Peter Wachanga, the website owner and operator.</li>
      <li><strong>"Services"</strong> includes web development, software engineering, and products/services offered through the marketplace.</li>
      <li><strong>"Admin"</strong> refers to authorized administrative users with enhanced access privileges.</li>
      <li><strong>"Content"</strong> includes all text, images, code, projects, and materials displayed on the website.</li>
    </ul>
    
    <h3>3. Use License and Restrictions</h3>
    
    <h4>3.1 Permitted Use</h4>
    <p>Permission is granted to:</p>
    <ul>
      <li>View and browse the website for personal, non-commercial purposes</li>
      <li>Submit contact forms and chatbot messages for legitimate inquiries</li>
      <li>Purchase products and services through our marketplace</li>
      <li>Download or print materials explicitly marked as downloadable (e.g., resume)</li>
    </ul>
    
    <h4>3.2 Prohibited Activities</h4>
    <p>You may not:</p>
    <ul>
      <li>Attempt to gain unauthorized access to admin areas, databases, or server systems</li>
      <li>Use automated tools, bots, or scrapers to extract content or data</li>
      <li>Submit spam, malicious code, or fraudulent information through forms or chatbot</li>
      <li>Exceed rate limits: 100 API requests per 15 minutes, 5 payment requests per 15 minutes, 5 login attempts per 15 minutes</li>
      <li>Reverse engineer, decompile, or attempt to discover source code (except publicly available code)</li>
      <li>Use the website for any illegal purpose or to violate any laws</li>
      <li>Impersonate another person or provide false information</li>
      <li>Interfere with security features, rate limiting, or authentication mechanisms</li>
      <li>Transmit viruses, malware, or harmful code</li>
      <li>Attempt SQL injection, XSS, CSRF, or other security exploits</li>
    </ul>
    
    <h3>4. Account Security (Admin Users)</h3>
    
    <h4>4.1 Admin Credentials</h4>
    <ul>
      <li>Admin accounts are password-protected and require email/password authentication</li>
      <li>Passwords must be at least 8 characters long</li>
      <li>Authentication tokens (JWT) expire after 24 hours</li>
      <li>You are responsible for maintaining the confidentiality of your credentials</li>
    </ul>
    
    <h4>4.2 Account Restrictions</h4>
    <ul>
      <li>Maximum 5 login attempts per 15 minutes (rate limiting)</li>
      <li>10 failed password attempts per hour triggers temporary account lock (1 hour)</li>
      <li>All login attempts, password changes, and admin actions are logged for security auditing</li>
    </ul>
    
    <h3>5. Marketplace and Services</h3>
    
    <h4>5.1 Product Listings</h4>
    <ul>
      <li>Products and services are displayed with descriptions, features, prices, and icons</li>
      <li>Prices are listed in Kenyan Shillings (KES) unless otherwise specified</li>
      <li>We reserve the right to modify prices, features, or availability at any time</li>
      <li>Product descriptions are accurate to the best of our knowledge but not guaranteed</li>
    </ul>
    
    <h4>5.2 Service Delivery</h4>
    <ul>
      <li>Services are provided on a project-by-project basis with timelines discussed individually</li>
      <li>Delivery timelines are estimates and may vary based on project complexity</li>
      <li>We will make reasonable efforts to meet agreed-upon deadlines</li>
      <li>Changes to project scope may affect timelines and costs</li>
    </ul>
    
    <h3>6. Payment Terms</h3>
    
    <h4>6.1 M-Pesa Payment Processing</h4>
    <ul>
      <li>Payments are processed through Safaricom M-Pesa (Business ShortCode: 174379)</li>
      <li>You must provide a valid Kenyan mobile phone number (254XXXXXXXXX format)</li>
      <li>STK Push prompts will be sent to your phone for payment authorization</li>
      <li>Transaction amounts are rounded to the nearest integer</li>
      <li>Payment confirmation is sent via M-Pesa receipt (receipt number stored for records)</li>
    </ul>
    
    <h4>6.2 Payment Security</h4>
    <ul>
      <li>Phone numbers are sanitized, validated, and partially masked in logs</li>
      <li>All payment transactions are logged with timestamps and transaction IDs</li>
      <li>M-Pesa callbacks are verified using IP whitelisting and signature authentication</li>
      <li>Maximum 5 payment requests per 15 minutes per IP address</li>
    </ul>
    
    <h4>6.3 Order Records</h4>
    <p>When making a purchase, we store:</p>
    <ul>
      <li>Product/service name</li>
      <li>Customer name, email, phone number, and location</li>
      <li>Payment amount and M-Pesa receipt number</li>
      <li>Transaction status (result code and description)</li>
      <li>Merchant Request ID and Checkout Request ID</li>
      <li>Transaction date and creation timestamp</li>
    </ul>
    
    <h4>6.4 Refund Policy</h4>
    <ul>
      <li>All payments are <strong>final and non-refundable</strong> unless explicitly stated otherwise</li>
      <li>Donations and support contributions are voluntary and non-refundable</li>
      <li>For service-based purchases, refunds may be considered on a case-by-case basis before work begins</li>
      <li>Technical payment failures (e.g., M-Pesa processing errors) will be investigated and resolved</li>
      <li>Refund requests must be submitted via email to wachangapeter763@gmail.com within 7 days</li>
    </ul>
    
    <h3>7. Contact Forms and Chatbot</h3>
    
    <h4>7.1 Submission Requirements</h4>
    <ul>
      <li>Contact forms require a subject and message (name, email, phone are optional)</li>
      <li>Chatbot messages are stored with subject "Chatbot Feedback"</li>
      <li>All submissions are stored indefinitely for record-keeping and response purposes</li>
      <li>Spam, abusive, or fraudulent submissions may be deleted without notice</li>
    </ul>
    
    <h4>7.2 Response Times</h4>
    <ul>
      <li>We strive to respond to inquiries within 24-48 business hours</li>
      <li>Response times are not guaranteed and may vary based on volume</li>
      <li>Chatbot provides automated responses; human review occurs separately</li>
      <li>No legal or binding commitments are made through automated chatbot responses</li>
    </ul>
    
    <h3>8. Intellectual Property Rights</h3>
    
    <h4>8.1 Our Content</h4>
    <ul>
      <li>All website content, including projects, code samples, designs, and text, is owned by Peter Wachanga</li>
      <li>Projects displayed are examples of work and may be subject to client confidentiality</li>
      <li>Code snippets shown are for demonstration purposes; unauthorized copying is prohibited</li>
      <li>The website design, layout, and branding are proprietary</li>
    </ul>
    
    <h4>8.2 Third-Party Content</h4>
    <ul>
      <li>Third-party libraries, frameworks, and tools are used under their respective licenses</li>
      <li>Icons from React Icons (Font Awesome, etc.) are used under their licenses</li>
      <li>Fonts from Google Fonts are used under the SIL Open Font License</li>
    </ul>
    
    <h4>8.3 User-Submitted Content</h4>
    <ul>
      <li>By submitting content (messages, feedback), you grant us a non-exclusive license to use, store, and display it</li>
      <li>You retain ownership of your submitted content</li>
      <li>You warrant that your submissions do not violate any third-party rights</li>
    </ul>
    
    <h3>9. Data Privacy and Security</h3>
    
    <h4>9.1 Data Collection</h4>
    <p>We collect and process data as detailed in our Privacy Policy, including:</p>
    <ul>
      <li>Contact information (name, email, phone)</li>
      <li>IP addresses and browser information</li>
      <li>Payment transaction data</li>
      <li>Authentication credentials (hashed passwords)</li>
      <li>Request logs and security audit trails</li>
    </ul>
    
    <h4>9.2 Security Measures</h4>
    <ul>
      <li>AES-256-GCM encryption for sensitive data</li>
      <li>Bcrypt password hashing (10 rounds)</li>
      <li>JWT authentication with 24-hour expiration</li>
      <li>HTTPS/TLS with HSTS (1-year max-age)</li>
      <li>Helmet.js security headers (CSP, XSS protection)</li>
      <li>Rate limiting on all endpoints</li>
      <li>IP whitelisting for critical endpoints</li>
      <li>SQL injection protection via parameterized queries</li>
      <li>Request size limits (10KB max)</li>
      <li>CORS restrictions to authorized domains</li>
    </ul>
    
    <h3>10. Rate Limiting and Fair Use</h3>
    
    <p>To ensure service availability and prevent abuse, the following limits apply:</p>
    
    <ul>
      <li><strong>API Requests:</strong> 100 requests per 15 minutes per IP</li>
      <li><strong>Payment Requests:</strong> 5 requests per 15 minutes per IP</li>
      <li><strong>Login Attempts:</strong> 5 attempts per 15 minutes per IP</li>
      <li><strong>Brute Force Protection:</strong> 10 failed password attempts per hour</li>
      <li><strong>Request Body Size:</strong> Maximum 10KB per request</li>
    </ul>
    
    <p>Exceeding these limits results in:</p>
    <ul>
      <li>HTTP 429 (Too Many Requests) responses</li>
      <li>Temporary blocking with retry-after headers</li>
      <li>Security event logging</li>
      <li>Potential permanent ban for persistent abuse</li>
    </ul>
    
    <h3>11. Security Monitoring and Logging</h3>
    
    <h4>11.1 Logged Events</h4>
    <p>For security and auditing purposes, we log:</p>
    <ul>
      <li>All HTTP requests (method, path, IP, user-agent, status code, duration)</li>
      <li>Authentication attempts (successful and failed logins)</li>
      <li>Password changes and security-sensitive operations</li>
      <li>Payment transactions (STK push, callbacks, results)</li>
      <li>Unauthorized access attempts (401/403 responses)</li>
      <li>Rate limit violations (429 responses)</li>
      <li>Error responses (4xx/5xx codes)</li>
      <li>Admin actions (create, update, delete operations)</li>
    </ul>
    
    <h4>11.2 Log Retention</h4>
    <ul>
      <li>Security logs: backend/logs/security.log</li>
      <li>Payment logs: backend/logs/payments.log</li>
      <li>Audit logs: backend/logs/audit.log</li>
      <li>Logs are retained indefinitely for compliance and security investigations</li>
      <li>Logs contain IP addresses and timestamps but exclude raw passwords</li>
    </ul>
    
    <h3>12. Disclaimer of Warranties</h3>
    
    <p>THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
    
    <ul>
      <li>Implied warranties of merchantability</li>
      <li>Fitness for a particular purpose</li>
      <li>Non-infringement</li>
      <li>Accuracy, reliability, or completeness of content</li>
      <li>Uninterrupted or error-free operation</li>
      <li>Security against unauthorized access or data breaches</li>
    </ul>
    
    <p>We do not warrant that:</p>
    <ul>
      <li>The website will meet your requirements</li>
      <li>Services will be delivered without delays or errors</li>
      <li>Defects will be corrected promptly</li>
      <li>The server is free from viruses or harmful components</li>
    </ul>
    
    <h3>13. Limitation of Liability</h3>
    
    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, PETER WACHANGA SHALL NOT BE LIABLE FOR:</p>
    
    <ul>
      <li>Indirect, incidental, special, consequential, or punitive damages</li>
      <li>Loss of profits, revenue, data, or business opportunities</li>
      <li>Damages arising from use or inability to use the website or services</li>
      <li>Damages resulting from unauthorized access to your data</li>
      <li>Damages from third-party services (M-Pesa, hosting providers, etc.)</li>
      <li>Damages exceeding the amount paid by you for services in the past 12 months</li>
    </ul>
    
    <p>This limitation applies even if we have been advised of the possibility of such damages.</p>
    
    <h3>14. Indemnification</h3>
    
    <p>You agree to indemnify, defend, and hold harmless Peter Wachanga from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:</p>
    
    <ul>
      <li>Your violation of these Terms</li>
      <li>Your violation of any laws or third-party rights</li>
      <li>Your use or misuse of the website or services</li>
      <li>Content you submit through forms or chatbot</li>
      <li>Unauthorized access using your credentials</li>
      <li>Payment disputes or chargebacks</li>
    </ul>
    
    <h3>15. Third-Party Services</h3>
    
    <h4>15.1 M-Pesa (Safaricom)</h4>
    <ul>
      <li>M-Pesa payment processing is governed by Safaricom's terms and conditions</li>
      <li>We are not responsible for M-Pesa service outages, delays, or failures</li>
      <li>M-Pesa transaction fees (if any) are borne by the customer</li>
      <li>M-Pesa disputes must be resolved through Safaricom's support channels</li>
    </ul>
    
    <h4>15.2 External Links</h4>
    <ul>
      <li>The website may contain links to external websites or resources</li>
      <li>We are not responsible for content, privacy practices, or terms of third-party sites</li>
      <li>Visiting third-party links is at your own risk</li>
    </ul>
    
    <h3>16. Termination and Suspension</h3>
    
    <h4>16.1 Our Rights</h4>
    <p>We reserve the right to:</p>
    <ul>
      <li>Suspend or terminate your access immediately without notice for violations of these Terms</li>
      <li>Block IP addresses associated with abuse, fraud, or security threats</li>
      <li>Delete contact submissions, orders, or accounts at our discretion</li>
      <li>Refuse service to anyone for any reason</li>
    </ul>
    
    <h4>16.2 Effects of Termination</h4>
    <ul>
      <li>Your right to access the website ceases immediately</li>
      <li>Obligations regarding confidentiality, indemnification, and liability survive termination</li>
      <li>Payment obligations for completed services remain enforceable</li>
    </ul>
    
    <h3>17. Modifications to Terms</h3>
    
    <ul>
      <li>We may update these Terms at any time without prior notice</li>
      <li>The "Last Updated" date indicates when changes were made</li>
      <li>Continued use of the website after changes constitutes acceptance of new Terms</li>
      <li>Material changes may be communicated via website banner or email (if contact info provided)</li>
      <li>You are responsible for reviewing Terms periodically</li>
    </ul>
    
    <h3>18. Governing Law and Jurisdiction</h3>
    
    <ul>
      <li>These Terms are governed by the laws of Kenya</li>
      <li>Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts</li>
      <li>If any provision is found invalid, the remaining provisions remain in effect</li>
      <li>Failure to enforce any right does not constitute a waiver of that right</li>
    </ul>
    
    <h3>19. Severability</h3>
    
    <p>If any provision of these Terms is held to be invalid or unenforceable, the invalid provision will be modified to the minimum extent necessary to make it valid and enforceable. If modification is not possible, the provision will be severed, and the remaining provisions will continue in full force.</p>
    
    <h3>20. Entire Agreement</h3>
    
    <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Peter Wachanga regarding use of this website and services, superseding any prior agreements or understandings.</p>
    
    <h3>21. Force Majeure</h3>
    
    <p>We are not liable for delays or failures in performance resulting from circumstances beyond our reasonable control, including:</p>
    <ul>
      <li>Natural disasters, wars, or terrorism</li>
      <li>Internet service provider failures</li>
      <li>Third-party service outages (M-Pesa, hosting providers)</li>
      <li>Government actions or legal restrictions</li>
      <li>Power outages or infrastructure failures</li>
    </ul>
    
    <h3>22. Contact Information</h3>
    
    <p>For questions about these Terms or to report violations:</p>
    
    <ul>
      <li><strong>Email:</strong> wachangapeter763@gmail.com</li>
      <li><strong>Contact Form:</strong> Available on our Contact page</li>
      <li><strong>Chatbot:</strong> Use our feedback assistant for quick questions</li>
      <li><strong>Business Name:</strong> Peter Wachanga Portfolio Services</li>
      <li><strong>Location:</strong> Kenya</li>
    </ul>
    
    <h3>23. Acknowledgment</h3>
    
    <p>BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY CEASE USING THE WEBSITE.</p>
    
    <p><em>These Terms are effective as of the Effective Date listed above and remain in effect until modified.</em></p>
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl">
              <FaFileContract className="text-white text-5xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-lg">
            <strong>Effective Date:</strong> February 2, 2026 • <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            By accessing or using this portfolio website, you agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing this portfolio website, submitting contact forms, using the chatbot, making purchases through our marketplace, or processing payments via M-Pesa, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-300 text-sm">⚠️ If you do not agree with any part of these Terms, you must not use our website or services.</p>
            </div>
          </motion.div>

          {/* Use License */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">2. Use License & Restrictions</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">✓ Permitted Use</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• View and browse for personal use</li>
                  <li>• Submit contact forms and chatbot messages</li>
                  <li>• Purchase marketplace products/services</li>
                  <li>• Download marked materials (e.g., resume)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3">✗ Prohibited Activities</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Unauthorized access attempts</li>
                  <li>• Using automated bots/scrapers</li>
                  <li>• Exceeding rate limits</li>
                  <li>• Submitting spam or malicious code</li>
                  <li>• Security exploits (SQL injection, XSS, etc.)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Marketplace & Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <FaShoppingCart className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">3. Marketplace & Services</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-purple-400 mb-2">Product Listings</h4>
                <p className="text-sm">Prices in KES • Descriptions are accurate but not guaranteed • We reserve the right to modify prices and availability</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-purple-400 mb-2">Service Delivery</h4>
                <p className="text-sm">Project-by-project basis • Timelines are estimates • Scope changes may affect costs and delivery</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">4. Payment Terms</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 p-4 rounded-xl">
                <h4 className="font-semibold text-green-400 mb-2">M-Pesa Processing</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Payments via Safaricom M-Pesa (ShortCode: 174379)</li>
                  <li>• Valid Kenyan mobile number required (254XXXXXXXXX)</li>
                  <li>• STK Push prompts sent to your phone</li>
                  <li>• Amounts rounded to nearest integer</li>
                  <li>• Receipt numbers stored for records</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 p-4 rounded-xl">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Refund Policy</h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>All payments are FINAL and NON-REFUNDABLE</strong> unless explicitly stated otherwise.
                </p>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Donations and support contributions are non-refundable</li>
                  <li>• Service-based purchases: case-by-case before work begins</li>
                  <li>• Technical failures will be investigated</li>
                  <li>• Refund requests: wachangapeter763@gmail.com within 7 days</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <h4 className="font-semibold text-yellow-400 mb-2">Security Measures</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• Phone number sanitization & masking</div>
                  <div>• Transaction logging with timestamps</div>
                  <div>• IP whitelisting for callbacks</div>
                  <div>• Max 5 payment requests per 15min</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rate Limiting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">5. Rate Limiting & Fair Use</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">🌐</div>
                <h4 className="font-semibold text-blue-400 mb-1">API Requests</h4>
                <p className="text-2xl font-bold text-white mb-1">100</p>
                <p className="text-xs text-gray-400">per 15 minutes</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">💳</div>
                <h4 className="font-semibold text-purple-400 mb-1">Payments</h4>
                <p className="text-2xl font-bold text-white mb-1">5</p>
                <p className="text-xs text-gray-400">per 15 minutes</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">🔐</div>
                <h4 className="font-semibold text-red-400 mb-1">Login Attempts</h4>
                <p className="text-2xl font-bold text-white mb-1">5</p>
                <p className="text-xs text-gray-400">per 15 minutes</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-300 text-sm">
                ⚠️ Exceeding limits results in HTTP 429 responses, temporary blocking, and potential permanent ban for persistent abuse.
              </p>
            </div>
          </motion.div>

          {/* Disclaimers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
                <FaExclamationTriangle className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">6. Disclaimers & Limitations</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                <h4 className="font-semibold text-yellow-400 mb-2">⚠️ "AS IS" Disclaimer</h4>
                <p className="text-sm">Services provided without warranties of merchantability, fitness for purpose, or non-infringement. No guarantees of uninterrupted operation or error-free content.</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Liability Limitation</h4>
                <p className="text-sm">Not liable for indirect, incidental, or consequential damages • Loss of profits, revenue, or data • Third-party service failures (M-Pesa, hosting) • Damages exceeding amounts paid in past 12 months</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl text-center"
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-white text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Questions About These Terms?</h2>
            <p className="text-white/90 mb-4 max-w-2xl mx-auto">
              For questions or to report violations, contact us:
            </p>
            <a
              href="mailto:wachangapeter763@gmail.com"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              wachangapeter763@gmail.com
            </a>
            <p className="text-white/80 text-sm mt-4">
              Contact Form • Chatbot • Business: Peter Wachanga Portfolio Services, Kenya
            </p>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 p-6 rounded-2xl">
              <p className="text-gray-300 font-semibold mb-2">⚖️ Governing Law: Kenya</p>
              <p className="text-gray-400 text-sm">
                BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
