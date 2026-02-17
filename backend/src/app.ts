import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter.middleware';

// Import routes
import quotesRoutes from './routes/quotes.routes';
import servicesRoutes from './routes/services.routes';
import testimonialsRoutes from './routes/testimonials.routes';
import faqsRoutes from './routes/faqs.routes';
import leadsRoutes from './routes/leads.routes';
import adminRoutes from './routes/admin.routes';
import analyticsRoutes from './routes/analytics.routes';
import setupRoutes from './routes/setup.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:8080',
  'https://apex-insure.vercel.app',
  'https://www.reinsureinsurance.in',
  'https://reinsureinsurance.in',
  process.env.CORS_ORIGIN
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all routes
app.use('/api', generalLimiter);

// Routes
app.use('/api/quotes', quotesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/setup', setupRoutes); // One-time setup route


// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;

