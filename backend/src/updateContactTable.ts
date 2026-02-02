import pool from './config/database';

async function updateTable() {
  try {
    console.log('Updating contact_submissions table...');
    
    await pool.query('ALTER TABLE contact_submissions MODIFY COLUMN name VARCHAR(255) NULL');
    console.log('✅ name column updated');
    
    await pool.query('ALTER TABLE contact_submissions MODIFY COLUMN email VARCHAR(255) NULL');
    console.log('✅ email column updated');
    
    console.log('✅ Table updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateTable();
