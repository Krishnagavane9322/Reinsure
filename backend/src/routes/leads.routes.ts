import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLead,
  updateLeadStatus,
} from '../controllers/leads.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { leadSubmissionLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Public routes
router.post('/', leadSubmissionLimiter, createLead);

// Protected routes (admin only)
router.get('/', authenticateAdmin, getLeads);
router.get('/:id', authenticateAdmin, getLead);
router.patch('/:id/status', authenticateAdmin, updateLeadStatus);

export default router;
