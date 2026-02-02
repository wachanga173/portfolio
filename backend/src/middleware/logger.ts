import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Security log file
const securityLogFile = path.join(logsDir, 'security.log');
const paymentLogFile = path.join(logsDir, 'payments.log');

// Log security events
export const logSecurityEvent = (event: string, details: any) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
  };

  fs.appendFileSync(securityLogFile, JSON.stringify(logEntry) + '\n');

  // Also log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔒 Security Event:', logEntry);
  }
};

// Log payment transactions
export const logPayment = (transaction: any) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    transaction,
  };

  fs.appendFileSync(paymentLogFile, JSON.stringify(logEntry) + '\n');

  console.log('💰 Payment Event:', logEntry);
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log request
  const requestLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('user-agent'),
    body: req.body && Object.keys(req.body).length > 0 ? '***REDACTED***' : undefined,
  };

  // Capture response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const responseLog = {
      ...requestLog,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    };

    // Log suspicious activity
    if (res.statusCode === 401 || res.statusCode === 403) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', responseLog);
    } else if (res.statusCode === 429) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', responseLog);
    } else if (res.statusCode >= 400) {
      logSecurityEvent('ERROR_RESPONSE', responseLog);
    }
  });

  next();
};

// Audit trail for sensitive operations
export const auditLog = (action: string, userId: number | null, details: any) => {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
  };

  const auditLogFile = path.join(logsDir, 'audit.log');
  fs.appendFileSync(auditLogFile, JSON.stringify(auditEntry) + '\n');

  console.log('📝 Audit:', auditEntry);
};
