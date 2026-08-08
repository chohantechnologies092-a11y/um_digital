export interface SiteSettings {
  agencyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
  logoSecondaryUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface ClientItem {
  id: string;
  label: string;
  logoUrl: string;
  order: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface HeroSection {
  badge: string;
  heading: string;
  subheading: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  stats: StatItem[];
}

export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  detailedContent?: string;
  icon: string; // Lucide icon name;
  features: string[];
  images?: string[];
  processSteps?: ServiceProcessStep[];
  benefits?: string[];
  faq?: ServiceFAQ[];
  active: boolean;
  order: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  serviceCategory?: string;
  tags?: string;
  description: string;
  challenge?: string;
  solution?: string;
  stats?: { label: string; value: string }[];
  content?: string;
  fullCaseStudy?: string;
  clientName: string;
  clientLocation?: string;
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  growthBadge?: string;
  beforeStats?: string;
  afterStats?: string;
}

export interface CompanyProfile {
  ceoMessage?: string;
  ceoImage?: string;
  certificateImage?: string;
  registeredName?: string;
  companyNumber?: string;
  jurisdiction?: string;
  incorporationDate?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  review: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  budgetRange?: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface AgencyData {
  settings: SiteSettings;
  hero: HeroSection;
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  leads: ContactLead[];
  clients: ClientItem[];
  companyProfile?: CompanyProfile;
}
