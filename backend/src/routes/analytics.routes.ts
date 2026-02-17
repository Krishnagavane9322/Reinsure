import { Router } from 'express';
import { getAnalytics, exportLeadsCSV } from '../controllers/analytics.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// All analytics routes are protected
router.get('/', authenticateAdmin, getAnalytics);
router.get('/export', authenticateAdmin, exportLeadsCSV);

export default router;
