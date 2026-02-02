import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { validateLogin } from '../middleware/validation';
import { authLimiter } from '../middleware/rateLimiter';
import { logSecurityEvent, auditLog } from '../middleware/logger';

const router = express.Router();

// Login
router.post('/login', authLimiter, validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      logSecurityEvent('LOGIN_FAILED_USER_NOT_FOUND', {
        email,
        ip: req.ip,
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      logSecurityEvent('LOGIN_FAILED_INVALID_PASSWORD', {
        email,
        ip: req.ip,
      });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback-secret', {
      expiresIn: '24h',
    });

    auditLog('USER_LOGIN', user.id, {
      email: user.email,
      ip: req.ip,
    });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    logSecurityEvent('LOGIN_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.ip,
    });
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token
router.get('/verify', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ valid: true, userId: req.userId });
});

// Change password
router.post('/change-password', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate new password strength
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      logSecurityEvent('PASSWORD_CHANGE_FAILED', {
        userId: req.userId,
        ip: req.ip,
      });
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.userId]);

    auditLog('PASSWORD_CHANGED', req.userId ?? null, {
      ip: req.ip,
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
