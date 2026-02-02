import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all orders with customer information (admin only)
router.get('/orders', authenticateToken, async (req: Request, res: Response) => {
  try {
    const [orders]: any = await db.query(`
      SELECT 
        id,
        product_name,
        customer_name,
        customer_email,
        customer_location,
        phone_number,
        amount,
        result_code,
        result_desc,
        mpesa_receipt_number,
        transaction_date,
        created_at
      FROM mpesa_donations
      WHERE customer_name IS NOT NULL
      ORDER BY created_at DESC
    `);

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order details (admin only)
router.get('/orders/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const [orders]: any = await db.query(
      `
      SELECT 
        id,
        product_name,
        customer_name,
        customer_email,
        customer_location,
        phone_number,
        amount,
        result_code,
        result_desc,
        mpesa_receipt_number,
        merchant_request_id,
        checkout_request_id,
        transaction_date,
        created_at
      FROM mpesa_donations
      WHERE id = ?
    `,
      [req.params.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(orders[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
