-- ═══════════════════════════════════════════════════════════════
-- Galaxy Eye Hospital — Supabase Database Schema
-- Run this in the Supabase SQL Editor to create all tables
-- ═══════════════════════════════════════════════════════════════

-- ─── Hospital Info (single-row config) ───
CREATE TABLE hospital_info (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  founded_year INT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Contact Info (single-row config) ───
CREATE TABLE contact_info (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  primary_phone TEXT NOT NULL,
  secondary_phone TEXT NOT NULL,
  toll_free TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  primary_email TEXT NOT NULL,
  appointment_email TEXT NOT NULL,
  careers_email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Social Media Links ───
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  handle TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Branches / Locations ───
CREATE TABLE branches (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('main', 'clinic', 'center')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  map_url TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Operating Hours ───
CREATE TABLE operating_hours (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  open_time TEXT NOT NULL,
  close_time TEXT NOT NULL,
  is_open BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Doctors ───
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  experience TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  languages TEXT[] DEFAULT '{}',
  linkedin TEXT,
  twitter TEXT,
  available BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Services ───
-- page_content stores the full service-detail page data as JSONB:
-- { heroTagline, heroDescription, heroImage, whatIsTitle, whatIsDescription,
--   whatIsImage, benefits[], process[], faqs[] }
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  duration TEXT NOT NULL,
  recovery_time TEXT NOT NULL,
  success_rate TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('surgical', 'non-surgical', 'diagnostic')),
  popular BOOLEAN DEFAULT false,
  page_content JSONB NOT NULL DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Patient Reviews ───
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  treatment TEXT NOT NULL,
  date DATE NOT NULL,
  branch TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Blog Posts ───
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  image TEXT NOT NULL,
  trending BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Awards ───
CREATE TABLE awards (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT,
  issuing_authority TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('national', 'state', 'medical', 'social', 'institutional')),
  highlighted BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Hospital Stats ───
CREATE TABLE hospital_stats (
  id SERIAL PRIMARY KEY,
  stat_key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Quick Links (footer/navigation) ───
CREATE TABLE quick_links (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Service Links (footer) ───
CREATE TABLE service_links (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Appointment Time Slots ───
CREATE TABLE appointment_time_slots (
  id SERIAL PRIMARY KEY,
  time_slot TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════
-- Row Level Security — Public read access for all tables
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE hospital_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE operating_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_time_slots ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public SELECT on all tables
CREATE POLICY "public_read" ON hospital_info FOR SELECT USING (true);
CREATE POLICY "public_read" ON contact_info FOR SELECT USING (true);
CREATE POLICY "public_read" ON social_links FOR SELECT USING (true);
CREATE POLICY "public_read" ON branches FOR SELECT USING (true);
CREATE POLICY "public_read" ON operating_hours FOR SELECT USING (true);
CREATE POLICY "public_read" ON doctors FOR SELECT USING (true);
CREATE POLICY "public_read" ON services FOR SELECT USING (true);
CREATE POLICY "public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "public_read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "public_read" ON awards FOR SELECT USING (true);
CREATE POLICY "public_read" ON hospital_stats FOR SELECT USING (true);
CREATE POLICY "public_read" ON quick_links FOR SELECT USING (true);
CREATE POLICY "public_read" ON service_links FOR SELECT USING (true);
CREATE POLICY "public_read" ON appointment_time_slots FOR SELECT USING (true);


-- ═══════════════════════════════════════════════════════════════
-- Indexes for common queries
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX idx_doctors_slug ON doctors (slug);
CREATE INDEX idx_services_slug ON services (slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_category ON blog_posts (category);
CREATE INDEX idx_awards_category ON awards (category);
CREATE INDEX idx_services_category ON services (category);
CREATE INDEX idx_reviews_treatment ON reviews (treatment);
