import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import { apiLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/logger';

// Import routes
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import socialRoutes from './routes/social';
import projectsRoutes from './routes/projects';
import skillsRoutes from './routes/skills';
import resumeRoutes from './routes/resume';
import mpesaRoutes from './routes/mpesa';
import pagesRoutes from './routes/pages';
import ordersRoutes from './routes/orders';
import marketplaceRoutes from './routes/marketplace';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3000'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request logging (before routes)
app.use(requestLogger);

// Rate limiting
app.use('/api/', apiLimiter);

// Body parser with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api', ordersRoutes);
app.use('/api', marketplaceRoutes);
app.use('/api', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════╗
║   🚀 Portfolio Backend Server Running        ║
║   📍 Port: ${PORT}                              ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}              ║
║   ⏰ Started: ${new Date().toLocaleString()}   ║
╚═══════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
