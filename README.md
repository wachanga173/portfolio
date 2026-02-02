# 🚀 Professional Portfolio - Full Stack Application

A modern, secure, and beautiful portfolio website built with React, TypeScript, Node.js, Express, and MySQL. Features include M-Pesa integration for donations, AES-256 encryption for sensitive data, and a complete admin dashboard.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful design with Tailwind CSS and Framer Motion animations
- 🔐 **Secure** - AES-256 encryption for sensitive data, JWT authentication
- 💳 **M-Pesa Integration** - Accept donations/support through M-Pesa STK Push
- 📱 **Responsive** - Mobile-first design that works on all devices
- 📄 **Resume Upload** - Store and serve PDF resume from database
- 🎯 **Admin Dashboard** - Complete CMS for managing content
- 🚀 **SEO Optimized** - Meta tags and semantic HTML
- 🔒 **Privacy & Terms** - Built-in pages for legal requirements

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router (Navigation)
- Axios (API calls)
- React Icons
- React Toastify (Notifications)

### Backend
- Node.js + Express
- TypeScript
- MySQL (Database)
- JWT (Authentication)
- Bcrypt (Password hashing)
- Multer (File upload)
- Helmet (Security)
- Rate Limiting

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone and Install

\`\`\`bash
cd "c:\\Users\\Peter\\visual code\\PORTFOLIO"
npm install
\`\`\`

### 2. Set up MySQL Database

Create a MySQL database:

\`\`\`sql
CREATE DATABASE portfolio_db;
\`\`\`

### 3. Configure Environment Variables

**Backend (.env):**

\`\`\`bash
cp backend/.env.example backend/.env
\`\`\`

Edit \`backend/.env\` with your credentials:

\`\`\`env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

# Encryption (Generate a 32-character key)
ENCRYPTION_KEY=your_32_character_encryption_key

# JWT Secret (Long random string)
JWT_SECRET=your_jwt_secret_key_very_long_and_random

# Admin Credentials
ADMIN_EMAIL=wachangapeter763@gmail.com
ADMIN_PASSWORD=your_secure_admin_password

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_business_shortcode
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000
\`\`\`

**Frontend (.env):**

\`\`\`bash
cp frontend/.env.example frontend/.env
\`\`\`

Edit \`frontend/.env\`:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 4. Generate Encryption Key

Run this in Node.js console or create a script:

\`\`\`javascript
console.log(require('crypto').randomBytes(16).toString('hex'));
\`\`\`

Use the output as your `ENCRYPTION_KEY` (must be exactly 32 characters).

### 5. Initialize Database

The database tables will be created automatically when you first start the backend server.

### 6. Create Admin User

After starting the backend, you'll need to manually create the admin user in the database:

\`\`\`bash
cd backend
npm run dev
\`\`\`

Then in MySQL:

\`\`\`sql
USE portfolio_db;

-- Generate hashed password for 'yourpassword' (you'll need to do this via bcrypt)
-- For now, you can use the auth endpoint to create the user programmatically
INSERT INTO users (email, password) VALUES ('wachangapeter763@gmail.com', 'hashed_password_here');
\`\`\`

Or create a script to hash and insert:

\`\`\`javascript
const bcrypt = require('bcrypt');
const password = await bcrypt.hash('your_password', 10);
console.log(password); // Copy this to SQL
\`\`\`

### 7. Add Initial Data

Add your social links, profile info, and initial data using the admin dashboard after logging in.

## 🏃 Running the Application

### Development Mode

**Start both frontend and backend:**

\`\`\`bash
npm run dev
\`\`\`

Or run separately:

\`\`\`bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
\`\`\`

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Production Build

\`\`\`bash
# Build frontend
npm run build

# Start backend
cd backend
npm run build
npm start
\`\`\`

## 📱 Default Pages

- **/** - Home page with hero section
- **/about** - About me with skills
- **/projects** - Portfolio projects
- **/resume** - Downloadable resume
- **/contact** - Contact information
- **/privacy** - Privacy policy
- **/terms** - Terms & conditions
- **/admin/login** - Admin login
- **/admin/dashboard** - Admin dashboard (protected)

## 🔐 Security Features

- **AES-256 Encryption** - All sensitive contact info encrypted in database
- **JWT Authentication** - Secure admin authentication
- **Password Hashing** - Bcrypt for password security
- **Rate Limiting** - Protection against brute force
- **Helmet.js** - HTTP security headers
- **CORS** - Configured for frontend-backend communication

## 📊 Database Schema

The application uses the following tables:

- `users` - Admin authentication
- `profile` - Personal information (encrypted)
- `social_links` - Social media links (encrypted)
- `projects` - Portfolio projects
- `skills` - Technical skills
- `resume` - PDF resume storage
- `mpesa_donations` - Donation transaction history
- `pages` - CMS pages (Terms, Privacy)

## 🎨 Customization

### Colors

Edit \`frontend/tailwind.config.js\` to change the color scheme:

\`\`\`javascript
colors: {
  primary: {
    // Your color palette
  }
}
\`\`\`

### Content

All content can be managed through the admin dashboard at `/admin/dashboard`.

## 📦 M-Pesa Integration

To enable M-Pesa:

1. Register for M-Pesa Daraja API at https://developer.safaricom.co.ke
2. Get your Consumer Key, Consumer Secret, Shortcode, and Passkey
3. Add them to your `.env` file
4. Set up your callback URL (must be publicly accessible)
5. For testing, use the sandbox environment

## 🚀 Deployment

### Backend Deployment

1. Deploy to a service like Heroku, Railway, or DigitalOcean
2. Set environment variables
3. Ensure MySQL database is accessible
4. Update FRONTEND_URL and MPESA_CALLBACK_URL

### Frontend Deployment

1. Build: `cd frontend && npm run build`
2. Deploy `dist` folder to Netlify, Vercel, or similar
3. Update VITE_API_URL to point to your backend

## 📝 Initial Setup Checklist

- [ ] Install Node.js and MySQL
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create MySQL database
- [ ] Configure `.env` files
- [ ] Generate encryption key
- [ ] Create admin user
- [ ] Start backend and verify database tables created
- [ ] Start frontend
- [ ] Login to admin dashboard
- [ ] Add profile information
- [ ] Add social links
- [ ] Upload resume
- [ ] Add projects and skills

## 🆘 Troubleshooting

**Database connection failed:**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**Encryption errors:**
- Ensure ENCRYPTION_KEY is exactly 32 characters

**M-Pesa not working:**
- Verify credentials
- Check callback URL is publicly accessible
- Ensure using correct environment (sandbox vs production)

## 📧 Contact

**Peter Wachanga**
- Email: wachangapeter763@gmail.com
- Phone: 0742481717
- LinkedIn: www.linkedin.com/in/wachanga-peter-493766389

## 📄 License

This project is private and proprietary.

---

Built with ❤️ by Peter Wachanga
