import fs from 'fs';
import path from 'path';
import { AgencyData } from '@/types';
import { ALL_PROJECTS } from './projects-data';

const DB_PATH = path.join(process.cwd(), 'data', 'agency_db.json');

export const initialAgencyData: AgencyData = {
  settings: {
    agencyName: 'UM Digital Agency',
    tagline: 'Empowering Brands Through Full-Stack Digital Innovation',
    contactEmail: 'contact@umdigitalagency.com',
    contactPhone: '+92 300 0000000',
    address: 'UM Digital Tower, Innovation Hub, Lahore, Pakistan & Worldwide',
    logoUrl: '/assets/um digital logo-01.png',
    logoSecondaryUrl: '/assets/um digital logo sa-01.png',
    socialLinks: {
      facebook: 'https://facebook.com/umdigitalagency',
      instagram: 'https://instagram.com/umdigitalagency',
      linkedin: 'https://linkedin.com/company/umdigitalagency',
      twitter: 'https://twitter.com/umdigitalagency',
      youtube: 'https://youtube.com/@umdigitalagency',
      whatsapp: 'https://wa.me/923000000000',
    },
  },
  hero: {
    badge: '⚡ FULL-STACK DIGITAL SERVICES AGENCY',
    heading: 'Transform Your Business With Next-Gen Digital Strategy',
    subheading: 'From high-converting Digital Marketing & SEO to custom Software Development, Graphic Design, Photography, Videography & Animation.',
    primaryCtaText: 'Explore Our Services',
    secondaryCtaText: 'Get Free Quote',
    stats: [
      { id: '1', label: 'Projects Completed', value: '450+' },
      { id: '2', label: 'Active Global Clients', value: '180+' },
      { id: '3', label: 'Creative & Tech Experts', value: '35+' },
      { id: '4', label: 'Client Satisfaction Rate', value: '99.4%' },
    ],
  },
  companyProfile: {
    registeredName: 'UM Digital / Aeronox Solutions LTD',
    companyNumber: '16277420',
    jurisdiction: 'England and Wales',
    incorporationDate: '26th February 2025',
    ceoMessage: `Welcome to our unified digital agency.\n\nWe believe in building digital products and campaigns that don't just look good, but deliver measurable ROI. By combining UM Digital's creative aesthetics with Aeronox Solutions' engineering excellence, we bring world-class solutions to global brands.`,
  },
  services: [
    {
      id: 'digital-marketing',
      slug: 'digital-marketing',
      title: 'Digital Marketing',
      shortDesc: 'Strategic social media campaigns, paid ads (Meta & Google), lead generation, and performance marketing to scale revenue.',
      fullDesc: 'Supercharge your brand visibility and ROI with data-backed digital marketing. We build multi-channel marketing funnels, manage high-yield PPC campaigns, drive organic community engagement, and optimize conversions across all social touchpoints.',
      icon: 'TrendingUp',
      features: [
        'Meta & Google Ads Management',
        'Social Media Management (SMM)',
        'Sales Funnel & Lead Generation',
        'Influencer & Content Strategy',
        'Analytics & ROI Dashboards',
      ],
      active: true,
      order: 1,
    },
    {
      id: 'seo-optimization',
      slug: 'seo-optimization',
      title: 'SEO (Search Engine Optimization)',
      shortDesc: 'Dominating search rankings with technical audits, targeted keywords, organic content, and Google Maps local SEO.',
      fullDesc: 'Outrank competitors and secure top rankings on Google search. Our comprehensive SEO strategy covers technical site optimization, high-converting keyword research, authoritative link building, and local Google My Business growth.',
      icon: 'Search',
      features: [
        'Comprehensive Technical SEO Audit',
        'High-Intent Keyword Strategy',
        'On-Page & Content Optimization',
        'Quality Backlink Building',
        'Local SEO & GMB Optimization',
      ],
      active: true,
      order: 2,
    },
    {
      id: 'graphics-designing',
      slug: 'graphics-designing',
      title: 'Graphics Designing & UI/UX',
      shortDesc: 'World-class branding, vector graphics, UI/UX designs, social media kits, and visual identity systems.',
      fullDesc: 'Elevate your visual presence with stunning aesthetics. Our creative team designs memorable logos, full brand guidelines, intuitive web & app UI/UX wireframes, ad creatives, and high-impact print assets.',
      icon: 'Palette',
      features: [
        'Brand Identity & Logo Design',
        'Web & Mobile App UI/UX',
        'Social Media Banners & Ads',
        'Vector Graphics & Illustrations',
        'Print & Packaging Design',
      ],
      active: true,
      order: 3,
    },
    {
      id: 'web-software-development',
      slug: 'web-software-development',
      title: 'Web / Software Development',
      shortDesc: 'Custom high-speed websites, Next.js web applications, e-commerce stores, custom dashboards, and mobile apps.',
      fullDesc: 'Engineered for speed, security, and scalability. We build custom full-stack web applications, e-commerce platforms, SaaS portals, and custom software systems using modern frameworks like Next.js, React, Node.js, and Cloud services.',
      icon: 'Code2',
      features: [
        'Next.js & React Web Applications',
        'Custom E-Commerce Development',
        'Full-Stack Admin Dashboards & CMS',
        'API Integration & Automation',
        'Mobile App Development (React Native)',
      ],
      active: true,
      order: 4,
    },
    {
      id: 'photography-videography',
      slug: 'photography-videography',
      title: 'Photography & Videography',
      shortDesc: 'Professional product shoots, corporate videography, event coverage, and high-quality cinematic commercials.',
      fullDesc: 'Tell your brand story visually. We provide high-end photography and videography services including cinematic product commercials, corporate brand films, event coverage, and professional headshots using industry-leading gear.',
      icon: 'Video',
      features: [
        'Commercial Product Photography',
        'Cinematic Brand Videos & Reels',
        'Corporate Event Coverage',
        'Drone & Aerial Videography',
        'Post-Production & Color Grading',
      ],
      active: true,
      order: 5,
    },
    {
      id: 'video-animation',
      slug: 'video-animation',
      title: 'Video Animation & Motion Graphics',
      shortDesc: 'Engaging 2D/3D animations, explainer videos, logo animations, and dynamic motion graphics.',
      fullDesc: 'Bring your ideas to life with dynamic motion graphics. We create captivating 2D and 3D explainer videos, custom logo animations, character rigging, and VFX that grab attention and explain complex concepts simply.',
      icon: 'PlaySquare',
      features: [
        '2D & 3D Explainer Videos',
        'Custom Logo Animations',
        'Motion Graphics for Social Media',
        'Character Animation & Rigging',
        'VFX & Video Editing',
      ],
      active: true,
      order: 6,
    }
  ],
  portfolio: ALL_PROJECTS,
  testimonials: [
    {
      id: 't-1',
      name: 'Ahmed Malik',
      role: 'CEO & Founder',
      company: 'TechMatrix Global',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 5,
      review: 'UM Digital Agency transformed our entire online presence. Their web development team delivered a lightning-fast site while their SEO strategy tripled our inbound leads in just 3 months!',
      featured: true,
    },
    {
      id: 't-2',
      name: 'Sophia Reynolds',
      role: 'Marketing Director',
      company: 'Vogue Essentials',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      rating: 5,
      review: 'The graphics design and commercial photography team at UM Digital are absolute visionaries. Their branding and commercial reels took our luxury line to another level.',
      featured: true,
    },
    {
      id: 't-3',
      name: 'David Chen',
      role: 'Operations Head',
      company: 'Omni Logistics',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      review: 'The custom software solution they built for our logistics tracking is robust and scalable. Best agency we have worked with by far.',
      featured: true,
    }
  ],
  team: [
    {
      id: '1',
      name: 'M Junaid Ahsan',
      role: 'Founder & Full-Stack Engineer',
      bio: 'Leading the technical vision and engineering robust digital platforms.',
      imageUrl: '/assets/team/placeholder.png',
    },
    {
      id: '2',
      name: 'Creative Lead',
      role: 'Art Director',
      bio: 'Crafting visually stunning brand identities and UI/UX experiences.',
      imageUrl: '/assets/team/placeholder.png',
    },
    {
      id: '3',
      name: 'Marketing Head',
      role: 'Digital Strategist',
      bio: 'Scaling brands through data-driven performance marketing and SEO.',
      imageUrl: '/assets/team/placeholder.png',
    }
  ],
  leads: [],
  clients: [
    { id: 'c-1', label: 'TechMatrix Global', logoUrl: '/assets/um digital logo-01.png', order: 1 },
    { id: 'c-2', label: 'Nexus Innovations', logoUrl: '/assets/um digital logo sa-01.png', order: 2 },
    { id: 'c-3', label: 'Aeronox Solutions', logoUrl: '/assets/um digital logo-01.png', order: 3 },
    { id: 'c-4', label: 'GlobalReach Media', logoUrl: '/assets/um digital logo sa-01.png', order: 4 },
    { id: 'c-5', label: 'Apex Financial', logoUrl: '/assets/um digital logo-01.png', order: 5 },
    { id: 'c-6', label: 'Quantum AI Labs', logoUrl: '/assets/um digital logo sa-01.png', order: 6 },
    { id: 'c-7', label: 'Zenith Studios', logoUrl: '/assets/um digital logo-01.png', order: 7 },
    { id: 'c-8', label: 'Stellar E-commerce', logoUrl: '/assets/um digital logo sa-01.png', order: 8 },
  ]
};

// Database utility functions
import { connectToDatabase } from './mongodb';
import { AgencyDataModel, ContactLeadModel } from './models';

export function getAgencyData(): AgencyData {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      const parsedData = JSON.parse(data) as AgencyData;
      parsedData.services = parsedData.services || initialAgencyData.services;
      parsedData.portfolio = parsedData.portfolio || initialAgencyData.portfolio;
      parsedData.testimonials = parsedData.testimonials || initialAgencyData.testimonials;
      parsedData.team = parsedData.team || initialAgencyData.team;
      parsedData.leads = parsedData.leads || [];
      if (!parsedData.clients) {
        parsedData.clients = initialAgencyData.clients;
      } else {
        // Upgrade legacy clients that might have 'icon' instead of 'logoUrl'
        parsedData.clients = parsedData.clients.map((c: any) => ({
          ...c,
          logoUrl: c.logoUrl || '/assets/um digital logo-01.png'
        }));
      }
      return parsedData;
    }
  } catch (error) {
    console.error('Error reading local DB:', error);
  }
  return initialAgencyData;
}

export async function getAgencyDataAsync(): Promise<AgencyData> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const doc = await AgencyDataModel.findOne().lean();
      if (!doc) {
        // Auto-seed MongoDB with local JSON data on first connect
        const initial = getAgencyData();
        await AgencyDataModel.create(initial);
        return initial;
      }
      return {
        settings: doc.settings,
        hero: doc.hero,
        companyProfile: doc.companyProfile,
        services: doc.services || [],
        portfolio: doc.portfolio || [],
        testimonials: doc.testimonials || [],
        team: doc.team || [],
        leads: doc.leads || [],
        clients: doc.clients || initialAgencyData.clients,
      } as AgencyData;
    }
  } catch (error) {
    console.error('Error fetching MongoDB agency data:', error);
  }
  return getAgencyData();
}

export function saveAgencyData(data: AgencyData): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving local DB:', error);
    return false;
  }
}

export async function saveAgencyDataAsync(data: AgencyData): Promise<boolean> {
  saveAgencyData(data);
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      await AgencyDataModel.findOneAndUpdate({}, data, { upsert: true, new: true });
      return true;
    }
  } catch (error) {
    console.error('Error saving MongoDB agency data:', error);
  }
  return true;
}

export async function saveLeadAsync(lead: import('@/types').ContactLead): Promise<boolean> {
  // Always update local storage
  const localData = getAgencyData();
  localData.leads.unshift(lead);
  saveAgencyData(localData);

  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      await ContactLeadModel.create(lead);
      await AgencyDataModel.findOneAndUpdate(
        {},
        { $push: { leads: { $each: [lead], $position: 0 } } },
        { upsert: true }
      );
      return true;
    }
  } catch (error) {
    console.error('Error saving MongoDB lead:', error);
  }
  return true;
}

// Helper methods for specific data queries
export function getServices() {
  return getAgencyData().services;
}

export function getActiveServices() {
  return getServices().filter(s => s.active).sort((a, b) => a.order - b.order);
}

export function getPortfolio() {
  return getAgencyData().portfolio.sort((a, b) => a.order - b.order);
}

export function getFeaturedPortfolio() {
  return getPortfolio().filter(p => p.featured);
}

export async function getServicesAsync() {
  const data = await getAgencyDataAsync();
  return data.services;
}

export async function getActiveServicesAsync() {
  const services = await getServicesAsync();
  return services.filter(s => s.active).sort((a, b) => a.order - b.order);
}

export async function getPortfolioAsync() {
  const data = await getAgencyDataAsync();
  return data.portfolio.sort((a, b) => a.order - b.order);
}

export async function getFeaturedPortfolioAsync() {
  const portfolio = await getPortfolioAsync();
  return portfolio.filter(p => p.featured);
}

export async function addLead(lead: import('@/types').ContactLead) {
  return saveLeadAsync(lead);
}
