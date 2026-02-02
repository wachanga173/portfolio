import rateLimit from 'express-rate-limit';

// Strict rate limiter for payment endpoints
export const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 payment requests per 15 minutes per IP
  message: {
    message: 'Too many payment requests. Please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  validate: { trustProxy: false }, // Disable validation since we handle proxy properly
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 login attempts per 15 minutes
  message: {
    message: 'Too many login attempts. Please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: false, // Count all attempts
  validate: { trustProxy: false }, // Disable validation since we handle proxy properly
});

// Brute force protection for password attempts
export const bruteForceLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Maximum 10 failed attempts per hour
  message: {
    message:
      'Account temporarily locked due to too many failed attempts. Please try again in 1 hour.',
    retryAfter: '1 hour',
  },
  skipSuccessfulRequests: true, // Only count failed requests
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false }, // Disable validation since we handle proxy properly
});

// Standard API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per 15 minutes
  message: {
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false }, // Disable validation since we handle proxy properly
});

// Aggressive limiter for M-Pesa callbacks (should only be Safaricom)
export const callbackLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Maximum 10 callbacks per minute
  message: {
    message: 'Too many callback requests.',
  },
  standardHeaders: false,
  validate: { trustProxy: false }, // Disable validation since we handle proxy properly
  legacyHeaders: false,
});
