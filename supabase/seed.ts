/* ══════════════════════════════════════════════════════════════
   Supabase Seed Script
   Reads existing TypeScript data files and inserts into Supabase.
   
   Usage:  npx tsx supabase/seed.ts
   ══════════════════════════════════════════════════════════════ */

import { createClient } from "@supabase/supabase-js";

// ── Import all existing data ──
import { hospitalInfo, contactInfo, socialLinks, branches, operatingHours, appointmentTimeSlots, quickLinks, serviceLinks, hospitalStats } from "../src/data/contactData";
import { doctors } from "../src/data/doctorsData";
import { services } from "../src/data/servicesData";
import { reviews } from "../src/data/reviewsData";
import { blogPosts } from "../src/data/blogData";
import { awards } from "../src/data/awardsData";

// ── Supabase client (uses same creds as .env) ──
const SUPABASE_URL = "https://buhgbvpkpkudjnszezxb.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_SERVICE_KEY) {
  console.error(
    "❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable.\n" +
    "   Set it before running:  $env:SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'\n" +
    "   Find it in Supabase → Settings → API → service_role (secret)"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function seed() {
  console.log("🌱 Starting seed...\n");

  // ── Hospital Info ──
  const { error: e1 } = await supabase.from("hospital_info").upsert({
    id: 1,
    name: hospitalInfo.name,
    legal_name: hospitalInfo.legalName,
    tagline: hospitalInfo.tagline,
    description: hospitalInfo.description,
    founded_year: hospitalInfo.foundedYear,
    logo: hospitalInfo.logo,
    website: hospitalInfo.website,
  });
  log("hospital_info", e1);

  // ── Contact Info ──
  const { error: e2 } = await supabase.from("contact_info").upsert({
    id: 1,
    primary_phone: contactInfo.primaryPhone,
    secondary_phone: contactInfo.secondaryPhone,
    toll_free: contactInfo.tollFree,
    emergency_phone: contactInfo.emergencyPhone,
    primary_email: contactInfo.primaryEmail,
    appointment_email: contactInfo.appointmentEmail,
    careers_email: contactInfo.careersEmail,
    whatsapp: contactInfo.whatsapp,
  });
  log("contact_info", e2);

  // ── Social Links ──
  const { error: e3 } = await supabase.from("social_links").upsert(
    socialLinks.map((s, i) => ({
      id: i + 1,
      platform: s.platform,
      url: s.url,
      handle: s.handle,
      sort_order: i,
    }))
  );
  log("social_links", e3);

  // ── Branches ──
  const { error: e4 } = await supabase.from("branches").upsert(
    branches.map((b) => ({
      id: b.id,
      name: b.name,
      type: b.type,
      address: b.address,
      city: b.city,
      state: b.state,
      pincode: b.pincode,
      phone: b.phone,
      email: b.email,
      map_url: b.mapUrl,
      lat: b.coordinates.lat,
      lng: b.coordinates.lng,
    }))
  );
  log("branches", e4);

  // ── Operating Hours ──
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const { error: e5 } = await supabase.from("operating_hours").upsert(
    operatingHours.map((h, i) => ({
      id: i + 1,
      day: h.day,
      open_time: h.openTime,
      close_time: h.closeTime,
      is_open: h.isOpen,
      sort_order: dayOrder.indexOf(h.day),
    }))
  );
  log("operating_hours", e5);

  // ── Doctors ──
  const { error: e6 } = await supabase.from("doctors").upsert(
    doctors.map((d, i) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      speciality: d.speciality,
      qualifications: d.qualifications,
      experience: d.experience,
      bio: d.bio,
      image: d.image,
      languages: d.languages,
      linkedin: d.socialLinks?.linkedin ?? null,
      twitter: d.socialLinks?.twitter ?? null,
      available: d.available,
      sort_order: i,
    }))
  );
  log("doctors", e6);

  // ── Services ──
  const { error: e7 } = await supabase.from("services").upsert(
    services.map((s, i) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      short_description: s.shortDescription,
      full_description: s.fullDescription,
      icon: s.icon,
      image: s.image,
      features: s.features,
      duration: s.duration,
      recovery_time: s.recoveryTime,
      success_rate: s.successRate,
      category: s.category,
      popular: s.popular,
      page_content: s.pageContent,
      sort_order: i,
    }))
  );
  log("services", e7);

  // ── Reviews ──
  const { error: e8 } = await supabase.from("reviews").upsert(
    reviews.map((r) => ({
      id: r.id,
      name: r.name,
      avatar: r.avatar,
      rating: r.rating,
      comment: r.comment,
      treatment: r.treatment,
      date: r.date,
      branch: r.branch,
      verified: r.verified,
    }))
  );
  log("reviews", e8);

  // ── Blog Posts ──
  const { error: e9 } = await supabase.from("blog_posts").upsert(
    blogPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      author: p.author,
      date: p.date,
      category: p.category,
      read_time: p.readTime,
      views: p.views,
      likes: p.likes,
      image: p.image,
      trending: p.trending,
      tags: p.tags,
    }))
  );
  log("blog_posts", e9);

  // ── Awards ──
  const { error: e10 } = await supabase.from("awards").upsert(
    awards.map((a, i) => ({
      id: a.id,
      title: a.title,
      year: a.year ?? null,
      issuing_authority: a.issuingAuthority,
      category: a.category,
      highlighted: a.highlighted,
      sort_order: i,
    }))
  );
  log("awards", e10);

  // ── Hospital Stats ──
  const { error: e11 } = await supabase.from("hospital_stats").upsert(
    hospitalStats.map((s, i) => ({
      id: i + 1,
      stat_key: s.id,
      value: s.value,
      label: s.label,
      icon: s.icon,
      sort_order: i,
    }))
  );
  log("hospital_stats", e11);

  // ── Quick Links ──
  const { error: e12 } = await supabase.from("quick_links").upsert(
    quickLinks.map((l, i) => ({
      id: i + 1,
      label: l.label,
      href: l.href,
      sort_order: i,
    }))
  );
  log("quick_links", e12);

  // ── Service Links ──
  const { error: e13 } = await supabase.from("service_links").upsert(
    serviceLinks.map((l, i) => ({
      id: i + 1,
      label: l.label,
      href: l.href,
      sort_order: i,
    }))
  );
  log("service_links", e13);

  // ── Appointment Time Slots ──
  const { error: e14 } = await supabase.from("appointment_time_slots").upsert(
    appointmentTimeSlots.map((t, i) => ({
      id: i + 1,
      time_slot: t,
      sort_order: i,
    }))
  );
  log("appointment_time_slots", e14);

  console.log("\n✅ Seed complete!");
}

function log(table: string, error: unknown) {
  if (error) {
    console.error(`  ❌ ${table}:`, error);
  } else {
    console.log(`  ✅ ${table}`);
  }
}

seed().catch(console.error);
