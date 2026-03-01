/* ──────────────────────────────────────────────
   Contact & Hospital Data — Single source of truth
   Simulates database tables: hospital, branches,
   social_media, operating_hours
   ────────────────────────────────────────────── */

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

export const hospitalInfo: HospitalInfo = {
  name: "Galaxy Eye Hospital",
  legalName: "Galaxy Eye Hospital Pvt. Ltd.",
  tagline: "Your Vision Is Our Mission",
  description:
    "Providing exceptional eye care services for over 40 years. Galaxy Eye Hospital is a leading LASIK, Retina, and Cataract Center in Pune, known for delivering high-quality, ethical, and technology-driven eye care.",
  foundedYear: 1985,
  logo: "/logo.png",
  website: "https://www.galaxyeyehospital.com",
};

/* ─── Contact Details ─── */
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

export const contactInfo: ContactInfo = {
  primaryPhone: "+91 8087808797",
  secondaryPhone: "+91 8087808797",
  tollFree: "+91 8087808797",
  emergencyPhone: "+91 8087808797",
  primaryEmail: "admin@galaxyeyehospital.com",
  appointmentEmail: "admin@galaxyeyehospital.com",
  careersEmail: "admin@galaxyeyehospital.com",
  whatsapp: "+91 8087808797",
};

/* ─── Social Media Links ─── */
export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: "https://facebook.com/galaxyeyehospital",
    handle: "@galaxyeyehospital",
  },
  {
    platform: "twitter",
    url: "https://twitter.com/galaxyeyehosp",
    handle: "@galaxyeyehosp",
  },
  {
    platform: "instagram",
    url: "https://instagram.com/galaxyeyehospital",
    handle: "@galaxyeyehospital",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/company/galaxy-eye-hospital",
    handle: "Galaxy Eye Hospital",
  },
  {
    platform: "youtube",
    url: "https://youtube.com/@galaxyeyehospital",
    handle: "@galaxyeyehospital",
  },
];

/* ─── Branches / Locations ─── */
export interface Branch {
  id: number;
  name: string;
  type: "main" | "clinic" | "center";
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  mapUrl: string;
  coordinates: { lat: number; lng: number };
}

export const branches: Branch[] = [
  {
    id: 1,
    name: "Galaxy Eye Hospital - JM Road Branch",
    type: "main",
    address: "JM Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411004",
    phone: "+91 8087808797",
    email: "admin@galaxyeyehospital.com",
    mapUrl: "https://maps.google.com/?q=Galaxy+Eye+Hospital+JM+Road+Pune",
    coordinates: { lat: 18.5196, lng: 73.8411 },
  },
  {
    id: 2,
    name: "Galaxy Eye Hospital - Narayangaon Branch",
    type: "clinic",
    address: "Narayangaon",
    city: "Narayangaon",
    state: "Maharashtra",
    pincode: "410504",
    phone: "+91 8087808797",
    email: "admin@galaxyeyehospital.com",
    mapUrl: "https://maps.google.com/?q=Galaxy+Eye+Hospital+Narayangaon",
    coordinates: { lat: 19.0956, lng: 73.9987 },
  },
];

/* ─── Operating Hours ─── */
export interface OperatingHours {
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export const operatingHours: OperatingHours[] = [
  { day: "Monday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Tuesday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Wednesday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Thursday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Friday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Saturday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
  { day: "Sunday", openTime: "09:00 AM", closeTime: "09:00 PM", isOpen: true },
];

/**
 * Returns a formatted summary string like "Mon - Sat: 8:00 AM - 8:00 PM"
 */
export function getFormattedHours(): string {
  return "Mon - Sun: 9:00 AM - 9:00 PM";
}

/* ─── Appointment Time Slots ─── */
export const appointmentTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

/* ─── Quick Links (for navigation) ─── */
export const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/about#doctors" },
  { label: "Services", href: "/services" },
  { label: "Appointments", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const serviceLinks = [
  { label: "LASIK Surgery", href: "/services#lasik-surgery" },
  { label: "Cataract Surgery", href: "/services#cataract-surgery" },
  { label: "Retina Care", href: "/services#retina-care" },
  { label: "Glaucoma Care", href: "/services#glaucoma-care" },
  { label: "Pediatric Ophthalmology", href: "/services#pediatric-ophthalmology" },
  { label: "Diagnostic Services", href: "/services#diagnostic-services" },
  { label: "Low Vision Services", href: "/services#low-vision-services" },
];

/* ─── Hospital Stats (reusable across pages) ─── */
export interface HospitalStat {
  id: string;
  value: string;
  label: string;
  icon: string; // Icon identifier — components map this to SVG
}

export const hospitalStats: HospitalStat[] = [
  { id: "experience", value: "40+", label: "Years Experience", icon: "clock" },
  { id: "patients", value: "95,000+", label: "Patients Served", icon: "users" },
  { id: "doctors", value: "50+", label: "Expert Doctors", icon: "activity" },
  { id: "awards", value: "15+", label: "Global Awards", icon: "award" },
];
