/* ──────────────────────────────────────────────
   Awards Data — Single source of truth
   Simulates a database table: awards
   ────────────────────────────────────────────── */

export interface Award {
  id: number;
  title: string;
  year?: string;
  issuingAuthority: string;
  category: "national" | "state" | "medical" | "social" | "institutional";
  highlighted: boolean;
}

export const awardCategories = [
  "All",
  "National",
  "State",
  "Medical",
  "Social",
  "Institutional",
];

export const awards: Award[] = [
  {
    id: 1,
    title: "Padmashree",
    year: "2024",
    issuingAuthority: "Government of India",
    category: "national",
    highlighted: true,
  },
  {
    id: 2,
    title: "Shivaneri Bhushan Award",
    year: "2016",
    issuingAuthority: "Shivaneri Foundation",
    category: "state",
    highlighted: true,
  },
  {
    id: 3,
    title: "D. Litt (Honorary Doctorate)",
    year: undefined,
    issuingAuthority: "Tilak Maharashtra Vidyapeeth",
    category: "institutional",
    highlighted: true,
  },
  {
    id: 4,
    title: "Award for Banking & Community Service",
    year: undefined,
    issuingAuthority: "Janata Sahakari Bank, Pune",
    category: "institutional",
    highlighted: false,
  },
  {
    id: 5,
    title: "Honorary Award for Free Eye Surgeries in Rural Areas",
    year: undefined,
    issuingAuthority: "Pune Municipal Corporation",
    category: "state",
    highlighted: true,
  },
  {
    id: 6,
    title: "Award for Conducting 1 Lakh Cataract Surgeries",
    year: undefined,
    issuingAuthority: "PCMC (Pimpri-Chinchwad Municipal Corporation)",
    category: "state",
    highlighted: true,
  },
  {
    id: 7,
    title: "Award for Immense Contribution to Cataract Surgeries",
    year: "2007-08",
    issuingAuthority: "Public Health Dept, Govt. of Maharashtra",
    category: "state",
    highlighted: true,
  },
  {
    id: 8,
    title: "Dhanvantari Puraskar",
    year: "2012",
    issuingAuthority: "Narayangaon Gram Panchayat",
    category: "social",
    highlighted: false,
  },
  {
    id: 9,
    title: "Guru Mahatmya Puraskar",
    year: undefined,
    issuingAuthority: "Late Laxmibai Dagadusheth Halwai Datta Mandir Trust",
    category: "social",
    highlighted: false,
  },
  {
    id: 10,
    title: "Shatayushi Sarvotkrushta Aarogya Sewa Puraskar",
    year: "2004",
    issuingAuthority: "For contribution to rural healthcare services",
    category: "social",
    highlighted: false,
  },
  {
    id: 11,
    title: "Vinayakrao Aapte Pranswarup Maanbindu",
    year: undefined,
    issuingAuthority: "Mohan Thuse Eye Hospital, Narayangaon — for exemplary service to the field",
    category: "medical",
    highlighted: false,
  },
  {
    id: 12,
    title: "Saraswati Ganesh Seva Puraskar",
    year: undefined,
    issuingAuthority: "Deshasth Rugwedi Brahmin Shikshanottejak Sanstha, Pune",
    category: "social",
    highlighted: false,
  },
  {
    id: 13,
    title: "Persistent Foundation Sanman",
    year: "2013-14",
    issuingAuthority: "Persistent Foundation",
    category: "institutional",
    highlighted: false,
  },
  {
    id: 14,
    title: "Felicitation for D.Litt Conferment",
    year: undefined,
    issuingAuthority: "Dr. Manohar Dole felicitated for being conferred with D.Litt",
    category: "institutional",
    highlighted: false,
  },
  {
    id: 15,
    title: "Honorary Award for Making Ambulances Accessible",
    year: undefined,
    issuingAuthority: "Shanivarvada Branch of Rotary Club, Pune",
    category: "social",
    highlighted: false,
  },
  {
    id: 16,
    title: "Laxmi-Vyankatesh Puraskar",
    year: undefined,
    issuingAuthority: "Laxmi Vyankatesh Trust, Pune — for contribution to social welfare",
    category: "social",
    highlighted: false,
  },
  {
    id: 17,
    title: "Honorary Memento for Eye Care in Rural Areas",
    year: undefined,
    issuingAuthority: "Sahyadri, Doordarshan — to Dr. Manohar Dole for noteworthy contribution",
    category: "state",
    highlighted: false,
  },
  {
    id: 18,
    title: "National Award",
    year: undefined,
    issuingAuthority: "Padmashree Manibhai Desai Pratishthan, Urali Kanchan",
    category: "national",
    highlighted: true,
  },
  {
    id: 19,
    title: "Parampujya Sadguru Nana Maharaj Mandalik Samajsewa Puraskar",
    year: undefined,
    issuingAuthority: "Shivagoraksha Ashram Trust, Pune",
    category: "social",
    highlighted: false,
  },
  {
    id: 20,
    title: "Late Dr R.V. Waradekar Award for Scientific Awareness",
    year: undefined,
    issuingAuthority: "Kesari Maratha Sansthan, Pune — on the occasion of the death anniversary of N.C. Kelkar",
    category: "medical",
    highlighted: false,
  },
  {
    id: 21,
    title: "Siddha Sewa Award",
    year: undefined,
    issuingAuthority: "For Humanitarian Research, Selfless Service & Good Deed",
    category: "social",
    highlighted: false,
  },
  {
    id: 22,
    title: "Academy Award",
    year: undefined,
    issuingAuthority: "Maharashtra Ophthalmology Society, Pune",
    category: "medical",
    highlighted: true,
  },
  {
    id: 23,
    title: "Vaidyakiya Seva Gaurav Puraskar",
    year: undefined,
    issuingAuthority: "Phoenix Foundation",
    category: "medical",
    highlighted: false,
  },
];

/** Helper: Get highlighted/featured awards */
export const getHighlightedAwards = () => awards.filter((a) => a.highlighted);

/** Helper: Get awards by category */
export const getAwardsByCategory = (category: string) =>
  category === "All"
    ? awards
    : awards.filter((a) => a.category === category.toLowerCase());

/** Helper: Get total award count */
export const getAwardCount = () => awards.length;
