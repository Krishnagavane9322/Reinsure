import { Router } from 'express';
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
} from '../controllers/quotes.controller';

const router = Router();

router.post('/', createQuote);
router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.patch('/:id', updateQuote);

export default router;
