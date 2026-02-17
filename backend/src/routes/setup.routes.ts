import express from 'express';
import { register } from '../controllers/admin.controller';

const router = express.Router();

// One-time admin registration endpoint (remove after use!)
router.post('/setup', register);

export default router;
