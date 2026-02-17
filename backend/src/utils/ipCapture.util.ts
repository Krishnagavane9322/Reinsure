import { Request } from 'express';

/**
 * Extract client IP address from request
 * Handles various proxy headers and fallbacks
 */
export const getClientIp = (req: Request): string => {
  // Check X-Forwarded-For header (used by most proxies/load balancers)
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    return ips.split(',')[0].trim();
  }

  // Check X-Real-IP header (used by nginx)
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return Array.isArray(realIp) ? realIp[0] : realIp;
  }

  // Fallback to req.ip (Express default)
  return req.ip || 'unknown';
};
