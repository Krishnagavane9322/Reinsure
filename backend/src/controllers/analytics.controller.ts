import { Request, Response } from 'express';
import Lead from '../models/Lead';

/**
 * Get analytics data
 * GET /api/analytics
 */
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, campaign, source } = req.query;

    // Build base filter
    const filter: any = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }
    
    if (campaign) filter.utm_campaign = campaign;
    if (source) filter.utm_source = source;

    // Total leads
    const totalLeads = await Lead.countDocuments(filter);

    // Leads today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const leadsToday = await Lead.countDocuments({
      ...filter,
      createdAt: { $gte: today },
    });

    // Leads this month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const leadsThisMonth = await Lead.countDocuments({
      ...filter,
      createdAt: { $gte: startOfMonth },
    });

    // Leads by campaign
    const leadsByCampaign = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$utm_campaign',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Leads by source
    const leadsBySource = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$utm_source',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Leads by service
    const leadsByService = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Daily leads for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyLeads = await Lead.aggregate([
      {
        $match: {
          ...filter,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalLeads,
          leadsToday,
          leadsThisMonth,
        },
        leadsByCampaign: leadsByCampaign.map((item) => ({
          campaign: item._id || 'Direct',
          count: item.count,
        })),
        leadsBySource: leadsBySource.map((item) => ({
          source: item._id || 'Unknown',
          count: item.count,
        })),
        leadsByService: leadsByService.map((item) => ({
          service: item._id || 'Not specified',
          count: item.count,
        })),
        dailyLeads: dailyLeads.map((item) => ({
          date: item._id,
          count: item.count,
        })),
        leadsByStatus: leadsByStatus.map((item) => ({
          status: item._id,
          count: item.count,
        })),
      },
    });
  } catch (error: any) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
    });
  }
};

/**
 * Export leads as CSV
 * GET /api/analytics/export
 */
export const exportLeadsCSV = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, campaign, source, service, status } = req.query;

    // Build filter
    const filter: any = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }
    
    if (campaign) filter.utm_campaign = campaign;
    if (source) filter.utm_source = source;
    if (service) filter.service = service;
    if (status) filter.status = status;

    // Get all leads matching filter
    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    // Generate CSV
    const csvHeaders = [
      'Name',
      'Email',
      'Phone',
      'Service',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'UTM Content',
      'Referrer',
      'IP',
      'Status',
      'Created At',
    ];

    const csvRows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.service || '',
      lead.utm_source || '',
      lead.utm_medium || '',
      lead.utm_campaign || '',
      lead.utm_term || '',
      lead.utm_content || '',
      lead.referrer || '',
      lead.ip || '',
      lead.status,
      lead.createdAt.toISOString(),
    ]);

    // Combine headers and rows
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=leads-export-${new Date().toISOString().split('T')[0]}.csv`
    );

    res.send(csvContent);
  } catch (error: any) {
    console.error('Export CSV error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export leads',
    });
  }
};
