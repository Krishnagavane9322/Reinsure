import { Request, Response } from 'express';
import Lead from '../models/Lead';
import { getClientIp } from '../utils/ipCapture.util';

/**
 * Create a new lead
 * POST /api/leads
 */
export const createLead = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
      insuranceType,
      subType,
      vehicleType,
      coverageType,
      planDuration,
      numberOfMembers,
      emiRequested,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and phone are required',
      });
    }

    // Capture metadata
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    // Create lead
    const lead = await Lead.create({
      name,
      email,
      phone,
      service,
      message,
      insuranceType,
      subType,
      vehicleType,
      coverageType,
      planDuration,
      numberOfMembers,
      emiRequested: emiRequested || false,
      utm_source: utm_source || 'organic',
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      ip,
      userAgent,
      status: 'new',
    });

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead created successfully',
    });
  } catch (error: any) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
    });
  }
};

/**
 * Get all leads with filtering
 * GET /api/leads
 */
export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      campaign,
      source,
      service,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;

    // Build filter
    const filter: any = {};
    
    if (campaign) filter.utm_campaign = campaign;
    if (source) filter.utm_source = source;
    if (service) filter.service = service;
    if (status) filter.status = status;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get leads
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Lead.countDocuments(filter);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
    });
  }
};

/**
 * Get single lead by ID
 * GET /api/leads/:id
 */
export const getLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
    });
  }
};

/**
 * Update lead status
 * PATCH /api/leads/:id/status
 */
export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'converted', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data: lead,
      message: 'Lead status updated',
    });
  } catch (error: any) {
    console.error('Update lead status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead status',
    });
  }
};
