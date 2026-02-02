import bcrypt from 'bcrypt';
import db from './config/database';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
  try {
    const email = process.env.ADMIN_EMAIL || 'wachangapeter763@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

    // Check if user already exists
    const [existing]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      console.log('❌ Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    console.log('✅ Admin user created successfully!');
    console.log(`Email: ${email}`);
    console.log('Password: (check your .env file)');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
