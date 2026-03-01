/* ──────────────────────────────────────────────
   Doctors Data — Single source of truth
   Simulates a database table: doctors
   ────────────────────────────────────────────── */

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

export const doctors: Doctor[] = [
  {
    id: 1,
    slug: "dr-rajesh-dole",
    name: "Dr. Rajesh Dole",
    speciality: "LASIK & Refractive Surgery",
    qualifications: "MS (Ophthalmology), FICO",
    experience: "20+ Years",
    bio: "A pioneer in blade-free LASIK and refractive surgery in Pune. Dr. Dole has performed over 15,000 successful laser vision correction procedures and is known for his patient-first approach.",
    image: "/hero.png",
    languages: ["English", "Hindi", "Marathi"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/dr-rajesh-dole",
    },
    available: true,
  },
  {
    id: 2,
    slug: "dr-sneha-patil",
    name: "Dr. Sneha Patil",
    speciality: "Retina & Vitreous Surgery",
    qualifications: "MS, DNB (Ophthalmology)",
    experience: "15+ Years",
    bio: "Specializing in medical and surgical retina, Dr. Patil is an expert in diabetic retinopathy, macular degeneration, and complex vitreoretinal surgeries.",
    image: "/hero.png",
    languages: ["English", "Hindi", "Marathi"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/dr-sneha-patil",
    },
    available: true,
  },
  {
    id: 3,
    slug: "dr-anand-kulkarni",
    name: "Dr. Anand Kulkarni",
    speciality: "Cataract & Glaucoma",
    qualifications: "MBBS, MS (Ophthalmology)",
    experience: "18+ Years",
    bio: "A leading cataract surgeon with expertise in micro-incision cataract surgery and premium IOL implants. Dr. Kulkarni also manages complex glaucoma cases with advanced interventions.",
    image: "/hero.png",
    languages: ["English", "Hindi", "Marathi"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/dr-anand-kulkarni",
    },
    available: true,
  },
  {
    id: 4,
    slug: "dr-priya-menon",
    name: "Dr. Priya Menon",
    speciality: "Pediatric Ophthalmology",
    qualifications: "MS, Fellowship (Pediatric)",
    experience: "12+ Years",
    bio: "Dr. Menon specializes in children's eye health, treating conditions like strabismus (squint), amblyopia (lazy eye), and congenital eye disorders with gentle, child-friendly care.",
    image: "/hero.png",
    languages: ["English", "Hindi"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/dr-priya-menon",
    },
    available: true,
  },
];
