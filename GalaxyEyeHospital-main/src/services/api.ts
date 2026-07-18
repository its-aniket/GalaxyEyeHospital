/* ══════════════════════════════════════════════════════════════
   Supabase API Service — Data-fetching layer
   Transforms DB rows (snake_case) → app types (camelCase)
   so existing components keep working with zero type changes.
   ══════════════════════════════════════════════════════════════ */

import { supabase } from "../lib/supabase";
import type {
  HospitalInfo,
  ContactInfo,
  SocialLink,
  Branch,
  OperatingHours,
  HospitalStat,
  Doctor,
  Service,
  ServicePageContent,
  Review,
  BlogPost,
  Award,
} from "../types";

type HomeConsultationLeadPayload = {
  fullName: string;
  contactNumber: string;
  whichEye: "Left" | "Right" | "Both";
  problemDescription: string;
  sinceHowLong: string;
  preferredCallbackTime: string;
  consent: boolean;
  photo: File;
  spamTrap?: string;
};

async function compressConsultationPhoto(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    const sourceUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxSize = 1600;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(sourceUrl);
        reject(new Error("Unable to compress the selected image."));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(sourceUrl);

          if (!blob) {
            reject(new Error("Unable to compress the selected image."));
            return;
          }

          resolve(
            new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        },
        "image/jpeg",
        0.82
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error("Unable to read the selected image."));
    };

    image.src = sourceUrl;
  });
}

export async function createHomeConsultationLead(
  payload: HomeConsultationLeadPayload
): Promise<void> {
  if (payload.spamTrap?.trim()) {
    throw new Error("Request rejected.");
  }

  const compressedPhoto = await compressConsultationPhoto(payload.photo);
  const fileExtension = compressedPhoto.type === "image/png" ? "png" : "jpg";
  const storagePath = `eye-care-at-home/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from("eye-photos")
    .upload(storagePath, compressedPhoto, {
      contentType: compressedPhoto.type,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { error: insertError } = await supabase
    .from("home_consultation_leads")
    .insert({
      full_name: payload.fullName,
      contact_number: payload.contactNumber,
      which_eye: payload.whichEye,
      problem_description: payload.problemDescription,
      since_how_long: payload.sinceHowLong || null,
      preferred_callback_time: payload.preferredCallbackTime || null,
      consent: payload.consent,
      image_url: storagePath,
      status: "New",
    });

  if (insertError) {
    throw insertError;
  }
}

/* ─── Hospital Info ─── */
export async function getHospitalInfo(): Promise<HospitalInfo> {
  const { data, error } = await supabase
    .from("hospital_info")
    .select("*")
    .single();
  if (error) throw error;
  return {
    name: data.name,
    legalName: data.legal_name,
    tagline: data.tagline,
    description: data.description,
    foundedYear: data.founded_year,
    logo: data.logo,
    website: data.website,
  };
}

/* ─── Contact Info ─── */
export async function getContactInfo(): Promise<ContactInfo> {
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .single();
  if (error) throw error;
  return {
    primaryPhone: data.primary_phone,
    secondaryPhone: data.secondary_phone,
    tollFree: data.toll_free,
    emergencyPhone: data.emergency_phone,
    primaryEmail: data.primary_email,
    appointmentEmail: data.appointment_email,
    careersEmail: data.careers_email,
    whatsapp: data.whatsapp,
  };
}

/* ─── Social Links ─── */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    platform: row.platform,
    url: row.url,
    handle: row.handle,
  }));
}

/* ─── Branches ─── */
export async function getBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .order("id");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type,
    address: row.address,
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    phone: row.phone,
    email: row.email,
    mapUrl: row.map_url,
    coordinates: { lat: row.lat, lng: row.lng },
  }));
}

/* ─── Operating Hours ─── */
export async function getOperatingHours(): Promise<OperatingHours[]> {
  const { data, error } = await supabase
    .from("operating_hours")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    day: row.day,
    openTime: row.open_time,
    closeTime: row.close_time,
    isOpen: row.is_open,
  }));
}

/* ─── Doctors ─── */
export async function getDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    speciality: row.speciality,
    qualifications: row.qualifications,
    experience: row.experience,
    bio: row.bio,
    image: row.image,
    languages: row.languages ?? [],
    socialLinks: {
      ...(row.linkedin ? { linkedin: row.linkedin } : {}),
      ...(row.twitter ? { twitter: row.twitter } : {}),
    },
    available: row.available,
  }));
}

/* ─── Services ─── */
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    icon: row.icon,
    image: row.image,
    features: row.features ?? [],
    duration: row.duration,
    recoveryTime: row.recovery_time,
    successRate: row.success_rate,
    category: row.category,
    popular: row.popular,
    pageContent: row.page_content as ServicePageContent,
  }));
}

/* ─── Reviews ─── */
export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    rating: row.rating,
    comment: row.comment,
    treatment: row.treatment,
    date: row.date,
    branch: row.branch,
    verified: row.verified,
  }));
}

/* ─── Blog Posts ─── */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("id");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    date: row.date,
    category: row.category,
    readTime: row.read_time,
    views: row.views,
    likes: row.likes,
    image: row.image,
    trending: row.trending,
    tags: row.tags ?? [],
  }));
}

/* ─── Awards ─── */
export async function getAwards(): Promise<Award[]> {
  const { data, error } = await supabase
    .from("awards")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    year: row.year ?? undefined,
    issuingAuthority: row.issuing_authority,
    category: row.category,
    highlighted: row.highlighted,
  }));
}

/* ─── Hospital Stats ─── */
export async function getHospitalStats(): Promise<HospitalStat[]> {
  const { data, error } = await supabase
    .from("hospital_stats")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({
    id: row.stat_key,
    value: row.value,
    label: row.label,
    icon: row.icon,
  }));
}

/* ─── Quick Links ─── */
export async function getQuickLinks(): Promise<
  { label: string; href: string }[]
> {
  const { data, error } = await supabase
    .from("quick_links")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({ label: row.label, href: row.href }));
}

/* ─── Service Links (footer) ─── */
export async function getServiceLinks(): Promise<
  { label: string; href: string }[]
> {
  const { data, error } = await supabase
    .from("service_links")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => ({ label: row.label, href: row.href }));
}

/* ─── Appointment Time Slots ─── */
export async function getAppointmentTimeSlots(): Promise<string[]> {
  const { data, error } = await supabase
    .from("appointment_time_slots")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data.map((row) => row.time_slot);
}
