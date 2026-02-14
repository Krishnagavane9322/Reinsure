import { Request, Response } from 'express';
import Quote from '../models/Quote';
import emailService from '../services/email.service';

export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    
    // Send email notification (don't block if email fails)
    emailService.sendQuoteNotification(req.body).catch(err => {
      console.error('Email notification failed:', err);
    });
    
    res.status(201).json({ success: true, data: quote });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getQuoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      res.status(404).json({ success: false, error: 'Quote not found' });
      return;
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quote) {
      res.status(404).json({ success: false, error: 'Quote not found' });
      return;
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
