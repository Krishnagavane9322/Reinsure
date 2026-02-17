import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  
  // Service Information
  service?: string;
  message?: string;
  insuranceType?: string;
  subType?: string;
  vehicleType?: string;
  coverageType?: string;
  planDuration?: string;
  numberOfMembers?: number;
  emiRequested: boolean;
  
  // UTM Tracking Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  
  // Metadata
  referrer?: string;
  ip?: string;
  userAgent?: string;
  
  // Status
  status: 'new' | 'contacted' | 'converted' | 'closed';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    // Personal Information
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    
    // Service Information
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    insuranceType: { type: String, trim: true },
    subType: { type: String, trim: true },
    vehicleType: { type: String, trim: true },
    coverageType: { type: String, trim: true },
    planDuration: { type: String, trim: true },
    numberOfMembers: { type: Number },
    emiRequested: { type: Boolean, default: false },
    
    // UTM Tracking Parameters
    utm_source: { type: String, trim: true, default: 'organic' },
    utm_medium: { type: String, trim: true },
    utm_campaign: { type: String, trim: true },
    utm_term: { type: String, trim: true },
    utm_content: { type: String, trim: true },
    
    // Metadata
    referrer: { type: String, trim: true },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    
    // Status
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
  },
  { 
    timestamps: true,
    // Add indexes for common queries
    indexes: [
      { utm_campaign: 1 },
      { utm_source: 1 },
      { createdAt: -1 },
      { status: 1 }
    ]
  }
);

export default mongoose.model<ILead>('Lead', LeadSchema);
