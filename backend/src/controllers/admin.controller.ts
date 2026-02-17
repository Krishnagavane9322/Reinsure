import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import Admin from '../models/Admin';


/**
 * Admin login
 * POST /api/admin/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const expiresIn: StringValue | number = (process.env.JWT_EXPIRES_IN || '7d') as StringValue;
    const signOptions: SignOptions = { expiresIn };
    const token = jwt.sign(
      { id: admin._id },
      jwtSecret,
      signOptions
    );





    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
    });
  }
};

/**
 * Register new admin (protected - admin only)
 * POST /api/admin/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and name are required',
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: 'Admin with this email already exists',
      });
    }

    // Create admin
    const admin = await Admin.create({
      email,
      password,
      name,
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      message: 'Admin created successfully',
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
    });
  }
};

/**
 * Get current admin info
 * GET /api/admin/me
 */
export const getCurrentAdmin = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: req.admin,
    });
  } catch (error: any) {
    console.error('Get current admin error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get admin info',
    });
  }
};
