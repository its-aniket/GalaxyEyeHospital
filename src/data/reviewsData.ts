/* ──────────────────────────────────────────────
   Customer Reviews Data — Single source of truth
   Simulates a database table: reviews
   ────────────────────────────────────────────── */

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number; // 1-5
  comment: string;
  treatment: string; // Service they received
  date: string;
  branch: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Arun Sharma",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "I got LASIK done at Galaxy Eye Hospital and it changed my life! Dr. Dole explained everything clearly, the procedure was painless, and I could see perfectly the next day. Thank you for giving me freedom from glasses!",
    treatment: "LASIK Surgery",
    date: "2025-12-15",
    branch: "Galaxy Eye Hospital - Main Hospital, Pune",
    verified: true,
  },
  {
    id: 2,
    name: "Meera Joshi",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "My mother's cataract surgery was handled with such care and professionalism. The staff was extremely supportive, and Dr. Kulkarni made sure she was comfortable throughout. Her vision is now crystal clear. Highly recommended!",
    treatment: "Cataract Surgery",
    date: "2025-11-28",
    branch: "Galaxy Eye Hospital - Main Hospital, Pune",
    verified: true,
  },
  {
    id: 3,
    name: "Rahul Deshmukh",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "Best eye hospital in Pune, hands down. I was diagnosed with early glaucoma and Dr. Kulkarni started me on a treatment plan that has kept my pressure perfectly controlled. The follow-ups are thorough and on time.",
    treatment: "Glaucoma Care",
    date: "2025-10-10",
    branch: "Galaxy Eye Hospital - JM Road Branch",
    verified: true,
  },
  {
    id: 4,
    name: "Priyanka Nair",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "Dr. Priya Menon is amazing with kids! My 6-year-old was so nervous, but she made the whole experience fun. Turns out my daughter had a lazy eye we hadn't noticed. The treatment has already shown great improvement.",
    treatment: "Pediatric Eye Care",
    date: "2025-09-22",
    branch: "Galaxy Eye Hospital - JM Road Branch",
    verified: true,
  },
  {
    id: 5,
    name: "Vikram Patil",
    avatar: "/hero.png",
    rating: 4,
    comment:
      "Had diabetic retinopathy treatment here. Dr. Sneha Patil is incredibly knowledgeable and patient. She took the time to explain my condition and treatment options in detail. The only reason I'm not giving 5 stars is the waiting time, but the care was top-notch.",
    treatment: "Retina Services",
    date: "2025-08-30",
    branch: "Galaxy Eye Hospital - Narayangaon Branch",
    verified: true,
  },
  {
    id: 6,
    name: "Sunita Deshpande",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "I had corneal cross-linking for keratoconus. The entire team at Galaxy Eye Hospital was supportive and transparent about the procedure. My cornea has stabilized and my vision has improved significantly. Forever grateful!",
    treatment: "Cornea Services",
    date: "2025-07-18",
    branch: "Galaxy Eye Hospital - Main Hospital, Pune",
    verified: true,
  },
  {
    id: 7,
    name: "Amit Kulkarni",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "From the reception to the consultation to the surgery — every step was professional and reassuring. The new hospital facility is modern and very clean. Galaxy Eye Hospital truly lives up to its reputation.",
    treatment: "LASIK Surgery",
    date: "2025-06-05",
    branch: "Galaxy Eye Hospital - Narayangaon Branch",
    verified: true,
  },
  {
    id: 8,
    name: "Neha Bhosale",
    avatar: "/hero.png",
    rating: 5,
    comment:
      "I visited for a routine eye check-up and was impressed by how thorough the examination was. They caught an early sign of macular degeneration that my previous doctor missed. The diagnostic equipment here is world-class.",
    treatment: "Retina Services",
    date: "2025-05-14",
    branch: "Galaxy Eye Hospital - Main Hospital, Pune",
    verified: true,
  },
];

/**
 * Get average rating from all reviews
 */
export function getAverageRating(): number {
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/**
 * Get reviews filtered by treatment/service
 */
export function getReviewsByTreatment(treatment: string): Review[] {
  return reviews.filter((r) => r.treatment === treatment);
}

/**
 * Get only verified reviews
 */
export function getVerifiedReviews(): Review[] {
  return reviews.filter((r) => r.verified);
}
