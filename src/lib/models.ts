import mongoose, { Schema, Document, Model } from 'mongoose';
import { AgencyData, ContactLead } from '@/types';

export interface IAgencyDataDocument extends Omit<AgencyData, 'id'>, Document {}
export interface IContactLeadDocument extends Omit<ContactLead, 'id'>, Document {
  id: string;
}

const AgencyDataSchema = new Schema(
  {
    settings: { type: Schema.Types.Mixed, required: true },
    hero: { type: Schema.Types.Mixed, required: true },
    companyProfile: { type: Schema.Types.Mixed },
    services: { type: Array, required: true },
    portfolio: { type: Array, required: true },
    testimonials: { type: Array, required: true },
    team: { type: Array, required: true },
    leads: { type: Array, default: [] },
    clients: { type: Array, default: [] },
  },
  { timestamps: true, strict: false }
);

const ContactLeadSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    serviceRequested: { type: String, default: 'General Inquiry' },
    budgetRange: { type: String, default: '' },
    message: { type: String, required: true },
    createdAt: { type: String, required: true },
    status: { type: String, default: 'New' },
  },
  { timestamps: true }
);

export const AgencyDataModel: Model<IAgencyDataDocument> =
  mongoose.models.AgencyData || mongoose.model<IAgencyDataDocument>('AgencyData', AgencyDataSchema);

export const ContactLeadModel: Model<IContactLeadDocument> =
  mongoose.models.ContactLead || mongoose.model<IContactLeadDocument>('ContactLead', ContactLeadSchema);
