import { Request, Response } from 'express';
import FAQ from '../models/FAQ';

export const getAllFAQs = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getFAQById = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      res.status(404).json({ success: false, error: 'FAQ not found' });
      return;
    }
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) {
      res.status(404).json({ success: false, error: 'FAQ not found' });
      return;
    }
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      res.status(404).json({ success: false, error: 'FAQ not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
