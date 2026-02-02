import { Request, Response, NextFunction } from 'express';
import { logSecurityEvent } from './logger';

// Safaricom M-Pesa IP ranges (add official IPs in production)
const SAFARICOM_IPS = [
  '127.0.0.1', // Localhost for testing
  '::1', // IPv6 localhost
  '196.201.214.0/24', // Safaricom IP range (example - verify with Safaricom)
  '196.201.215.0/24', // Safaricom IP range (example - verify with Safaricom)
];

// Check if IP is in whitelist
const isIpWhitelisted = (ip: string): boolean => {
  // In development, allow all
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  // Check exact match
  if (SAFARICOM_IPS.includes(ip)) {
    return true;
  }

  // Check CIDR ranges
  for (const range of SAFARICOM_IPS) {
    if (range.includes('/')) {
      // Simplified CIDR check (for production, use proper IP range library)
      const [network] = range.split('/');
      if (ip.startsWith(network.split('.').slice(0, 3).join('.'))) {
        return true;
      }
    }
  }

  return false;
};

// IP whitelist middleware for M-Pesa callbacks
export const mpesaIpWhitelist = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  if (!isIpWhitelisted(clientIp)) {
    logSecurityEvent('UNAUTHORIZED_MPESA_CALLBACK', {
      ip: clientIp,
      path: req.path,
      headers: req.headers,
    });

    return res.status(403).json({
      message: 'Forbidden: Unauthorized source',
    });
  }

  next();
};

// Verify M-Pesa callback authenticity
export const verifyMpesaCallback = (req: Request, res: Response, next: NextFunction) => {
  const { Body } = req.body;

  if (!Body || !Body.stkCallback) {
    logSecurityEvent('INVALID_MPESA_CALLBACK_FORMAT', {
      ip: req.ip,
      body: req.body,
    });

    return res.status(400).json({
      ResultCode: 1,
      ResultDesc: 'Invalid callback format',
    });
  }

  const { stkCallback } = Body;

  // Verify required fields
  const requiredFields = ['MerchantRequestID', 'CheckoutRequestID', 'ResultCode'];
  for (const field of requiredFields) {
    if (!(field in stkCallback)) {
      logSecurityEvent('MISSING_MPESA_CALLBACK_FIELD', {
        ip: req.ip,
        missingField: field,
      });

      return res.status(400).json({
        ResultCode: 1,
        ResultDesc: `Missing field: ${field}`,
      });
    }
  }

  next();
};

// Admin IP whitelist (optional - for high security)
export const adminIpWhitelist = (allowedIps: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    if (process.env.NODE_ENV === 'production' && !allowedIps.includes(clientIp)) {
      logSecurityEvent('UNAUTHORIZED_ADMIN_ACCESS', {
        ip: clientIp,
        path: req.path,
      });

      return res.status(403).json({
        message: 'Forbidden: Unauthorized IP address',
      });
    }

    next();
  };
};
