import pool from './config/database';

/**
 * Migration script to add customer information fields to mpesa_donations table
 * Run this once to update existing database
 */

async function migrateDatabase() {
  try {
    console.log('🔄 Starting database migration...');

    const connection = await pool.getConnection();

    // Check if columns already exist
    const [columns]: any = await connection.query(`
      SHOW COLUMNS FROM mpesa_donations LIKE 'customer_name'
    `);

    if (columns.length === 0) {
      console.log('📝 Adding customer information columns...');

      // Add customer information columns
      await connection.query(`
        ALTER TABLE mpesa_donations
        ADD COLUMN customer_name VARCHAR(255) AFTER phone_number,
        ADD COLUMN customer_email VARCHAR(255) AFTER customer_name,
        ADD COLUMN customer_location VARCHAR(255) AFTER customer_email,
        ADD COLUMN product_name VARCHAR(255) AFTER customer_location
      `);

      console.log('✅ Customer information columns added successfully!');
    } else {
      console.log('ℹ️ Customer information columns already exist. Skipping migration.');
    }

    connection.release();
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateDatabase();
