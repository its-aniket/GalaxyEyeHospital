/* ══════════════════════════════════════════════════════════════
   Shared Type Definitions
   All interfaces and static constants used across the app.
   ══════════════════════════════════════════════════════════════ */

/* ─── Hospital Info ─── */
export interface HospitalInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  foundedYear: number;
  logo: string;
  website: string;
}

/* ─── Contact Info ─── */
export interface ContactInfo {
  primaryPhone: string;
  secondaryPhone: string;
  tollFree: string;
  emergencyPhone: string;
  primaryEmail: string;
  appointmentEmail: string;
  careersEmail: string;
  whatsapp: string;
}

/* ─── Social Links ─── */
export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

/* ─── Branches ─── */
export interface Branch {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  mapUrl: string;
  coordinates: { lat: number; lng: number };
}

/* ─── Operating Hours ─── */
export interface OperatingHours {
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

/* ─── Hospital Stats ─── */
export interface HospitalStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

/* ─── Doctors ─── */
export interface Doctor {
  id: number;
  slug: string;
  name: string;
  speciality: string;
  qualifications: string;
  experience: string;
  bio: string;
  image: string;
  languages: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
  available: boolean;
}

/* ─── Services ─── */
export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServicePageContent {
  heroTagline: string;
  heroDescription: string;
  heroImage: string;
  whatIsTitle: string;
  whatIsDescription: string;
  whatIsImage: string;
  benefits: ServiceBenefit[];
  process: ProcessStep[];
  faqs: FAQ[];
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  duration: string;
  recoveryTime: string;
  successRate: string;
  category: "surgical" | "non-surgical" | "diagnostic";
  popular: boolean;
  pageContent: ServicePageContent;
}

/* ─── Reviews ─── */
export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
  branch: string;
  verified: boolean;
}

/* ─── Blog Posts ─── */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  trending: boolean;
  tags: string[];
}

/* ─── Awards ─── */
export interface Award {
  id: number;
  title: string;
  year?: string;
  issuingAuthority: string;
  category: "national" | "state" | "medical" | "social" | "institutional";
  highlighted: boolean;
}

/* ─── Static Constants ─── */
export const serviceCategories = ["All", "Surgical", "Non-Surgical", "Diagnostic"];

export const blogCategories = ["All", "LASIK", "Eye Health", "Glaucoma", "Cataract", "Pediatric", "Nutrition"];

export const awardCategories = ["All", "National", "State", "Medical", "Social", "Institutional"];

export function getFormattedHours(): string {
  return "Mon - Sun: 9:00 AM - 9:00 PM";
}
