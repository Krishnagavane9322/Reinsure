import { Router } from 'express';
import {
  login,
  register,
  getCurrentAdmin,
} from '../controllers/admin.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { loginLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Public routes
router.post('/login', loginLimiter, login);

// Protected routes
router.post('/register', authenticateAdmin, register);
router.get('/me', authenticateAdmin, getCurrentAdmin);

export default router;
