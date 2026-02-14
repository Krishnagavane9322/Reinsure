import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  insuranceType?: string;
  subType?: string;
  vehicleType?: string;
  coverageType?: string;
  planDuration?: string;
  numberOfMembers?: number;
  emiRequested: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
    insuranceType: { type: String, trim: true },
    subType: { type: String, trim: true },
    vehicleType: { type: String, trim: true },
    coverageType: { type: String, trim: true },
    planDuration: { type: String, trim: true },
    numberOfMembers: { type: Number },
    emiRequested: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IQuote>('Quote', QuoteSchema);
