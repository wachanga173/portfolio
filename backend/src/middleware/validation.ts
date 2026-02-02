import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware to check results
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Phone number validation (Kenyan format)
export const validatePhoneNumber = (phone: string): boolean => {
  // Remove any spaces, dashes, or plus signs
  const cleaned = phone.replace(/[\s\-+]/g, '');

  // Check if it's a valid Kenyan number
  // Formats: 254XXXXXXXXX, 07XXXXXXXX, 01XXXXXXXX, 7XXXXXXXX, 1XXXXXXXX
  const kenyaPattern = /^(?:254|0)?([71]\d{8})$/;
  return kenyaPattern.test(cleaned);
};

// Sanitize phone number to M-Pesa format (254XXXXXXXXX)
export const sanitizePhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[\s\-+]/g, '');

  if (cleaned.startsWith('254')) {
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    return '254' + cleaned.substring(1);
  } else if (cleaned.length === 9) {
    return '254' + cleaned;
  }

  return cleaned;
};

// M-Pesa STK Push validation
export const validateStkPush = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .custom((value) => {
      if (!validatePhoneNumber(value)) {
        throw new Error('Invalid Kenyan phone number format');
      }
      return true;
    }),
  body('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 1, max: 150000 })
    .withMessage('Amount must be between KES 1 and KES 150,000')
    .toFloat(),
  body('customerName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('customerEmail')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('customerLocation')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location must not exceed 200 characters')
    .escape(),
  body('productName')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Product name must not exceed 255 characters')
    .escape(),
  validate,
];

// Authentication validation
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validate,
];

// Profile update validation
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters')
    .escape(),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Bio must not exceed 5000 characters'),
  body('email').optional().trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .custom((value) => {
      if (value && !validatePhoneNumber(value)) {
        throw new Error('Invalid phone number format');
      }
      return true;
    }),
  validate,
];

// Project validation
export const validateProject = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters')
    .escape(),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  body('technologies').trim().notEmpty().withMessage('Technologies are required'),
  body('github_url').optional().trim().isURL().withMessage('Invalid GitHub URL'),
  body('live_url').optional().trim().isURL().withMessage('Invalid live URL'),
  validate,
];

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
