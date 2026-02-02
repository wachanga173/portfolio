import express, { Request, Response } from 'express';
import axios from 'axios';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';
import { validateStkPush, sanitizePhoneNumber } from '../middleware/validation';
import { paymentLimiter, callbackLimiter } from '../middleware/rateLimiter';
import { logPayment, logSecurityEvent } from '../middleware/logger';
import { mpesaIpWhitelist, verifyMpesaCallback } from '../middleware/ipWhitelist';

const router = express.Router();

// Get M-Pesa access token
const getMpesaToken = async (): Promise<string> => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
};

// Initiate STK Push
router.post('/stk-push', paymentLimiter, validateStkPush, async (req: Request, res: Response) => {
  try {
    const { phoneNumber, amount, customerName, customerEmail, customerLocation, productName } =
      req.body;

    // Sanitize phone number to proper format
    const sanitizedPhone = sanitizePhoneNumber(phoneNumber);

    // Log payment attempt
    logPayment({
      type: 'STK_PUSH_INITIATED',
      phone: sanitizedPhone.substring(0, 6) + '***', // Partially mask phone
      amount,
      customerName,
      productName,
      ip: req.ip,
    });

    const token = await getMpesaToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount), // Ensure integer
        PartyA: sanitizedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: sanitizedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'Portfolio Support',
        TransactionDesc: 'Support Peter Wachanga',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Store customer info temporarily (will be updated when callback arrives)
    if (customerName || customerEmail) {
      await db.query(
        `INSERT INTO mpesa_donations (merchant_request_id, checkout_request_id, customer_name, customer_email, customer_location, product_name, phone_number, amount, result_code) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, -1)`,
        [
          response.data.MerchantRequestID,
          response.data.CheckoutRequestID,
          customerName || null,
          customerEmail || null,
          customerLocation || null,
          productName || null,
          sanitizedPhone,
          Math.round(amount),
        ]
      );
    }

    // Log successful STK push
    logPayment({
      type: 'STK_PUSH_SUCCESS',
      merchantRequestId: response.data.MerchantRequestID,
      checkoutRequestId: response.data.CheckoutRequestID,
      customerName,
      productName,
    });

    res.json({
      success: true,
      message: 'STK push sent successfully',
      data: response.data,
    });
  } catch (error: any) {
    console.error('M-Pesa STK Push error:', error.response?.data || error);

    // Log failed payment
    logSecurityEvent('STK_PUSH_FAILED', {
      ip: req.ip,
      error: error.response?.data || error.message,
    });

    res.status(500).json({
      message: 'Failed to initiate payment',
      error: error.response?.data || error.message,
    });
  }
});

// M-Pesa callback
router.post(
  '/callback',
  callbackLimiter,
  mpesaIpWhitelist,
  verifyMpesaCallback,
  async (req: Request, res: Response) => {
    try {
      const { Body } = req.body;
      const { stkCallback } = Body;

      // Log callback received
      logPayment({
        type: 'CALLBACK_RECEIVED',
        merchantRequestId: stkCallback.MerchantRequestID,
        checkoutRequestId: stkCallback.CheckoutRequestID,
        resultCode: stkCallback.ResultCode,
        resultDesc: stkCallback.ResultDesc,
      });

      // Check if record exists (from STK push with customer info)
      const [existingRecords]: any = await db.query(
        'SELECT id FROM mpesa_donations WHERE checkout_request_id = ? LIMIT 1',
        [stkCallback.CheckoutRequestID]
      );

      if (existingRecords.length > 0) {
        // Update existing record
        await db.query(
          `UPDATE mpesa_donations 
           SET result_code = ?, result_desc = ?, amount = ?, mpesa_receipt_number = ?, transaction_date = ?, phone_number = ? 
           WHERE checkout_request_id = ?`,
          [
            stkCallback.ResultCode,
            stkCallback.ResultDesc,
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'Amount')?.Value || 0,
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'MpesaReceiptNumber')
              ?.Value || null,
            new Date(),
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'PhoneNumber')?.Value ||
              null,
            stkCallback.CheckoutRequestID,
          ]
        );
      } else {
        // Insert new record (fallback for donations without customer info)
        await db.query(
          `INSERT INTO mpesa_donations 
           (merchant_request_id, checkout_request_id, result_code, result_desc, amount, mpesa_receipt_number, transaction_date, phone_number) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            stkCallback.MerchantRequestID,
            stkCallback.CheckoutRequestID,
            stkCallback.ResultCode,
            stkCallback.ResultDesc,
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'Amount')?.Value || 0,
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'MpesaReceiptNumber')
              ?.Value || null,
            new Date(),
            stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'PhoneNumber')?.Value ||
              null,
          ]
        );
      }

      // Log successful transaction
      if (stkCallback.ResultCode === 0) {
        logPayment({
          type: 'PAYMENT_SUCCESS',
          merchantRequestId: stkCallback.MerchantRequestID,
          amount: stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'Amount')?.Value,
          receiptNumber: stkCallback.CallbackMetadata?.Item?.find(
            (i: any) => i.Name === 'MpesaReceiptNumber'
          )?.Value,
        });
      } else {
        logSecurityEvent('PAYMENT_FAILED', {
          merchantRequestId: stkCallback.MerchantRequestID,
          resultCode: stkCallback.ResultCode,
          resultDesc: stkCallback.ResultDesc,
        });
      }

      res.json({ ResultCode: 0, ResultDesc: 'Success' });
    } catch (error) {
      console.error('M-Pesa callback error:', error);
      logSecurityEvent('CALLBACK_PROCESSING_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: req.ip,
      });
      res.json({ ResultCode: 1, ResultDesc: 'Failed' });
    }
  }
);

// Get donation stats (admin only)
router.get('/stats', authenticateToken, async (req: Request, res: Response) => {
  try {
    const [stats]: any = await db.query(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount
      FROM mpesa_donations
      WHERE result_code = 0
    `);

    res.json(stats[0]);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
