# Galaxy Eye Hospital — Frontend Documentation

> **Tech Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS 4  
> **Last Updated:** March 1, 2026

### ⚙️ Workflow Rules
1. **Reference First:** Always read this file before working on any component — do not manually re-read source files unless this doc lacks the needed detail.
2. **Keep in Sync:** After every code change (new component, layout change, color update, new page, data change, etc.), update the relevant sections of this document immediately.
3. **Single Source of Truth:** This file is the canonical reference for the entire frontend.

---

## 1. Pages

| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 1 | **Home** | `/` | ✅ Built | Landing page with all main sections |
| 2 | **About** | `/about` | ✅ Built | Company history, mission, vision, team, core values, doctor cards |
| 3 | **Services** | `/services` | ✅ Built | Listing of all 7 eye care services with category filters, stats cards |
| 3b | **Service Detail** | `/services/:slug` | ✅ Built | Individual service page with hero, what-is, benefits, process steps, FAQs, CTA (7 pages) |
| 4 | **LASIK** | `/services/lasik-surgery` | ✅ Built | Covered by Service Detail template (slug: `lasik-surgery`) |
| 5 | **Awards** | `/awards` | ✅ Built | 23 awards with category filters (National, State, Medical, Social, Institutional), featured highlights, trust statement |
| 6 | **Blog** | `/blog` | ✅ Built | Blog listing + detail view (state-based navigation) |
| 7 | **Contact** | `/contact` | ✅ Built | Contact form (name, phone, email, message), 2 branch cards (JM Road, Narayangaon), opening hours 9AM–9PM, 24/7 emergency, quick CTA |

> **Routing:** React Router DOM v7 is installed. `BrowserRouter` wraps the app in `App.tsx`. Navbar uses `<Link>` components with active-state highlighting via `useLocation`.

---

## 2. Home Page — Section Breakdown

The Home page is composed of the following sections rendered in order:

### 2.1 Navbar
- **Position:** Fixed top, full width, `z-50`
- **Background:** `bg-white/90` with `backdrop-blur-md`
- **Content:**
  - Logo + Brand name ("Galaxy Eye Hospital")
  - 7 navigation links: Home, About, Services, LASIK, Awards, Blog, Contact
  - Phone number: `1800-EYE-CARE`
  - "Book Appointment" CTA button
  - Mobile hamburger menu (toggleable)

### 2.2 Hero Section
- **Background:** Gradient `from-white via-blue-50/30 to-teal-50/20`
- **Layout:** 2-column grid (`lg:grid-cols-2`)
- **Left Column:**
  - "Accepting New Patients" animated badge
  - Headline: *"See the World with Clarity"*
  - Subtext about 40+ years of experience
  - Two CTA buttons: "Book Your Appointment" (primary) + "Explore Services" (outline)
  - Trust signals: 4.9/5 star rating (12k+ reviews), "Top Rated — Best Eye Hospital 2024"
- **Right Column:**
  - Hero image (`/hero.png`) with decorative gradient blur
  - Floating card: "95k+ Happy Patients Served"

### 2.3 Stats Section
- **Background:** Primary color (dark teal) with dot pattern overlay
- **Layout:** 4-column grid (`grid-cols-2 md:grid-cols-4`)
- **Stats Displayed:**
  - 40+ Years Experience
  - 95,000+ Patients Served
  - 50+ Expert Doctors
  - 15+ Global Awards
- Each stat has an icon, large number, and label

### 2.4 Services Section
- **Background:** `bg-gray-50`
- **Layout:** 3-column grid (`md:grid-cols-2 lg:grid-cols-3`)
- **Section Header:** "Our Expertise" badge + "Comprehensive Eye Care Services" heading
- **7 Service Cards:**
  1. **LASIK Surgery** — Advanced blade-free vision correction
  2. **Cataract Surgery** — Micro-incision, premium lens implants
  3. **Retina Care** — Diabetic retinopathy, macular degeneration
  4. **Glaucoma Care** — Early detection, advanced management
  5. **Pediatric Ophthalmology** — Squint, lazy eye, vision screening
  6. **Low Vision Services** — Visual aids, rehabilitation, adaptive techniques
  7. **Diagnostic Services** — OCT, fundus photography, visual field analysis
- Each card has: icon, title, description, "Learn More" link
- Hover effects: shadow elevation, left accent bar, icon color change

### 2.5 Appointment Section
- **Background:** `bg-white`
- **Layout:** 3-column grid (`lg:grid-cols-3`), left 2 columns for selection, right 1 for form
- **Left Column (2-span):**
  - **Branch Selector:** Dropdown with 3 branches
    - Main Hospital, Downtown
    - West Side Clinic
    - North Medical Center
  - **Calendar:** Current month grid with selectable dates, past dates disabled
  - **Time Slots:** 12 slots in grid (09:00 AM – 04:30 PM)
- **Right Column (sticky):**
  - Form fields: Full Name, Phone Number, Email Address (all with icons)
  - Booking Summary: shows selected date, time, branch
  - "Confirm Booking" button (accent color)
  - Confirmation note text

### 2.6 Why Choose Us Section
- **Background:** `bg-gray-50`
- **Layout:** 2-column grid (`lg:grid-cols-2`)
- **Left Column:**
  - Section header: "Why Choose Us" + "Trusted by Thousands"
  - Description paragraph
  - 6 feature bullet points with checkmark icons:
    1. 40+ years of trusted eye care excellence
    2. Board-certified ophthalmologists & optometrists
    3. State-of-the-art diagnostic equipment
    4. Comprehensive pre & post-operative care
    5. Insurance & cashless treatment options
    6. Multiple convenient locations across the city
  - "Learn More About Us" CTA button
- **Right Column:**
  - Gradient card (primary → accent) with "Our Promise"
  - 4 mini-stats: 4.9/5 Patient Rating, 98% Success Rate, 24/7 Emergency Care, 15+ Specializations
  - Decorative blur circles

### 2.7 CTA Banner
- **Background:** Primary color with dot pattern overlay
- **Layout:** Centered text, single column
- **Content:**
  - Headline: *"Your Vision Is Our Mission — Book Your Visit Today"*
  - Subtitle about regular eye check-ups
  - Two CTA buttons: "Book Appointment" (white) + "Call: 1-800-123-456" (outline white)

### 2.8 Footer
- **Background:** `hsl(var(--foreground))` (dark navy/charcoal)
- **Layout:** 4-column grid (`md:grid-cols-2 lg:grid-cols-4`)
- **Columns:**
  1. **Brand:** Logo, tagline, social media icons (F, T, I, L)
  2. **Quick Links:** About Us, Our Doctors, Services, Appointments, Testimonials, Contact Us
  3. **Our Services:** LASIK Surgery, Cataract Surgery, Retina Care, Glaucoma Care, Pediatric Ophthalmology, Diagnostic Services
  4. **Contact Us:** Address, phone, email, working hours
- **Bottom Bar:** Copyright + Privacy Policy / Terms of Service / Sitemap

---

## 3. Fonts

| Font | Usage | Weight(s) | Source |
|------|-------|-----------|--------|
| **Outfit** | Headings (`h1`–`h6`), stat values, brand name | 400, 500, 600, 700, 800 | Google Fonts |
| **Inter** | Body text, paragraphs, labels, buttons, nav links | 300, 400, 500, 600, 700 | Google Fonts |

### Font Application Rules
- **All headings** (`h1`–`h6`) → `font-family: "Outfit"`, `font-weight: 700`, `letter-spacing: -0.025em`
- **Body text** → `font-family: "Inter"`, regular weight
- **Buttons & labels** → Inter, `font-medium` or `font-semibold`
- **Brand name** → Outfit, bold
- **Small labels/badges** → Inter, `uppercase`, `tracking-wider`

### Tailwind Theme Tokens
```css
--font-display: "Outfit", sans-serif;
--font-sans: "Inter", sans-serif;
```

---

## 4. Layout Guidelines

### 4.1 Overall Page Structure
```
┌─────────────────────────────────────┐
│  Navbar (fixed top, z-50)           │
├─────────────────────────────────────┤
│  <main>                             │
│    ├── Hero Section                 │
│    ├── Stats Section                │
│    ├── Services Section             │
│    ├── Why Choose Us Section        │
│    ├── Appointment Section          │
│    ├── CTA Banner                   │
│  </main>                            │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### 4.2 Container
- Max width: Tailwind `container` (responsive)
- Horizontal padding: `px-4` (mobile) / `px-6` (desktop)
- Centered: `mx-auto`

### 4.3 Section Spacing
- Standard vertical padding: `py-24` (6rem)
- Stats section: `py-16` (4rem) — shorter
- CTA Banner: `py-20` (5rem)
- Footer: `pt-16 pb-8`

### 4.4 Grid Systems Used
| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | 1 col (stacked) | 1 col | 2 cols (`lg:grid-cols-2`) |
| Stats | 2 cols | 4 cols | 4 cols |
| Services | 1 col | 2 cols | 3 cols |
| Appointment | 1 col | 1 col | 3 cols (2+1 split) |
| Why Choose Us | 1 col | 1 col | 2 cols |
| Footer | 1 col | 2 cols | 4 cols |

### 4.5 Breakpoints (Tailwind defaults)
| Name | Width |
|------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

---

## 5. Color Scheme

### 5.1 CSS Variable Tokens

| Token | HSL Value | Hex Equivalent | Usage |
|-------|-----------|----------------|-------|
| `--primary` | `176 61% 19%` | `#134D4A` | Dark teal — headings, primary buttons, navbar active, stats bg |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on primary backgrounds |
| `--accent` | `173 80% 40%` | `#14B8A6` | Bright teal — badges, hover accents, accent bar, confirm button |
| `--accent-foreground` | `0 0% 100%` | `#FFFFFF` | Text on accent backgrounds |
| `--background` | `0 0% 100%` | `#FFFFFF` | Page background |
| `--foreground` | `222 47% 11%` | `#0F172A` | Main text color, footer background |
| `--secondary` | `210 40% 96%` | `#F1F5F9` | Light gray background alternative |
| `--muted` | `210 40% 96.1%` | `#F1F5F9` | Muted backgrounds |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#64748B` | Secondary/muted text |
| `--card` | `0 0% 100%` | `#FFFFFF` | Card backgrounds |
| `--border` | `214.3 31.8% 91.4%` | `#E2E8F0` | Borders, dividers |
| `--input` | `214.3 31.8% 91.4%` | `#E2E8F0` | Input field borders |
| `--ring` | `176 61% 19%` | `#134D4A` | Focus ring color |
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Error/destructive actions |
| `--radius` | `0.5rem` | — | Default border radius |

### 5.2 Color Palette Visual

```
Primary (Dark Teal):    ███████  #134D4A  — Brand identity, headings, CTA
Accent (Bright Teal):   ███████  #14B8A6  — Highlights, badges, secondary CTA
Background (White):     ███████  #FFFFFF  — Page background
Foreground (Navy):      ███████  #0F172A  — Body text, footer bg
Gray-50:                ███████  #F9FAFB  — Alternate section backgrounds
Gray-600:               ███████  #4B5563  — Body paragraph text
```

### 5.3 Color Usage Map
| Element | Color |
|---------|-------|
| Page background | White (`--background`) |
| Alternate sections (Services, Why Choose Us) | `gray-50` |
| All headings (h1-h6) | Primary dark teal |
| Body paragraphs | `gray-600` |
| Secondary/muted text | `gray-500` / `--muted-foreground` |
| Primary buttons | Primary bg + white text |
| Accent/confirm buttons | Accent bg + white text |
| Outline buttons | Primary border + primary text |
| Nav links (inactive) | `gray-600` |
| Nav links (active/hover) | Primary |
| Hover underline bar | Accent |
| Service card icons (default) | Primary |
| Service card icons (hover) | White on primary bg |
| Stats section bg | Primary |
| Stats values | White |
| Stats labels | `blue-100` |
| CTA Banner bg | Primary |
| Footer bg | Foreground (dark navy) |
| Footer links | `gray-400`, hover → accent |
| Focus rings | Accent |

---

## 6. Component Information

### 6.1 Component Tree

```
App
├── Navbar
│   ├── Logo + Brand Name
│   ├── Desktop Nav Links (7 links)
│   ├── Phone Number Display
│   ├── "Book Appointment" Button
│   ├── Mobile Toggle Button
│   └── Mobile Menu (conditional)
│       ├── Nav Links
│       └── "Book Appointment" Button
│
├── <main>
│   ├── Hero
│   │   ├── Badge ("Accepting New Patients")
│   │   ├── Heading + Subtext
│   │   ├── CTA Buttons (2)
│   │   ├── Trust Signals (Rating + Award)
│   │   └── Hero Image + Floating Card
│   │
│   ├── Stats
│   │   └── Stat Cards ×4 (icon, value, label)
│   │
│   ├── Services
│   │   ├── Section Header
│   │   └── Service Cards ×6
│   │       ├── Icon
│   │       ├── Title
│   │       ├── Description
│   │       └── "Learn More" Link
│   │
│   ├── AppointmentSection
│   │   ├── Section Header
│   │   ├── Branch Selector (dropdown)
│   │   ├── Calendar (current month grid)
│   │   ├── Time Slot Grid (12 slots)
│   │   └── Booking Form (sticky sidebar)
│   │       ├── Name Input
│   │       ├── Phone Input
│   │       ├── Email Input
│   │       ├── Booking Summary
│   │       └── "Confirm Booking" Button
│   │
│   ├── WhyChooseUs
│   │   ├── Section Header
│   │   ├── Feature List (6 items)
│   │   ├── CTA Button
│   │   └── "Our Promise" Card (4 mini-stats)
│   │
│   └── CTABanner
│       ├── Heading + Subtext
│       └── CTA Buttons (2)
│
└── Footer
    ├── Brand + Social Icons
    ├── Quick Links Column
    ├── Services Column
    ├── Contact Info Column
    └── Bottom Bar (copyright + legal links)
```

### 6.2 Component Details

| Component | File | State | Props | Key Dependencies |
|-----------|------|-------|-------|------------------|
| `Navbar` | `components/Navbar.tsx` | `mobileOpen` (boolean) | None | `react-router-dom` (`Link`, `useLocation`) |
| `HomePage` | `pages/HomePage.tsx` | None | None | Hero, Stats, Services, AppointmentSection, WhyChooseUs, CTABanner |
| `Hero` | `components/Hero.tsx` | None | None | — |
| `Stats` | `components/Stats.tsx` | None | None | `data/contactData.ts` (hospitalStats) |
| `Services` | `components/Services.tsx` | None | None | `data/servicesData.ts` |
| `AppointmentSection` | `components/AppointmentSection.tsx` | `selectedBranch`, `selectedDate`, `selectedTime` | None | `data/contactData.ts` (branches, timeSlots) |
| `WhyChooseUs` | `components/WhyChooseUs.tsx` | None | None | — |
| `CTABanner` | `components/CTABanner.tsx` | None | None | `data/contactData.ts` (contactInfo) |
| `Footer` | `components/Footer.tsx` | None | None | `data/contactData.ts`, `react-router-dom` |
| `AboutPage` | `pages/AboutPage.tsx` | None | None | `data/doctorsData.ts`, `react-router-dom` |
| `BlogPage` | `pages/BlogPage.tsx` | `view`, `selectedSlug` | None | `data/blogData.ts` |
| └ `BlogListing` | (inside pages/BlogPage.tsx) | `selectedCategory`, `searchQuery` | `onSelectPost` | — |
| └ `BlogDetail` | (inside pages/BlogPage.tsx) | `isLiked`, `likes`, `views`, `scrollProgress`, `isBookmarked`, `shareToast` | `slug`, `onBack` | — |
| `ServicesPage` | `pages/ServicesPage.tsx` | `activeCategory` | None | `data/servicesData.ts`, `data/contactData.ts`, `react-router-dom` |
| `ServiceDetailPage` | `pages/ServiceDetailPage.tsx` | `openFAQ` | URL param: `slug` | `data/servicesData.ts`, `data/contactData.ts`, `react-router-dom` |
| `AwardsPage` | `pages/AwardsPage.tsx` | `activeCategory` | None | `data/awardsData.ts`, `data/contactData.ts`, `react-router-dom` |
| `ContactPage` | `pages/ContactPage.tsx` | `formData`, `submitted` | None | `data/contactData.ts`, `react-router-dom` |

### 6.3 Centralized Data Files (`src/data/`)

All data is now stored in centralized TypeScript files simulating database tables. Components import from these files.

| Data File | Exports | Simulates DB Table | Used By |
|-----------|---------|-------------------|---------|
| `data/blogData.ts` | `blogPosts` (6), `blogCategories` (7), `BlogPost` interface | `blog_posts`, `blog_categories` | BlogPage |
| `data/doctorsData.ts` | `doctors` (4), `Doctor` interface | `doctors` | AboutPage |
| `data/servicesData.ts` | `services` (7), `serviceCategories` (4), `serviceIconMap`, `Service` + `ServicePageContent` + `FAQ` + `ProcessStep` + `ServiceBenefit` interfaces | `services`, `service_categories`, `service_page_content`, `faqs` | Services, ServicesPage, ServiceDetailPage |
| `data/contactData.ts` | `hospitalInfo`, `contactInfo`, `socialLinks` (5), `branches` (3), `operatingHours` (7), `appointmentTimeSlots` (12), `quickLinks` (6), `serviceLinks` (6), `hospitalStats` (4), helper functions | `hospital`, `contacts`, `social_media`, `branches`, `operating_hours` | Footer, Stats, AppointmentSection, CTABanner, AboutPage |
| `data/reviewsData.ts` | `reviews` (8), `getAverageRating()`, `getReviewsByTreatment()`, `getVerifiedReviews()`, `Review` interface | `reviews` | (ready for Testimonials section) |
| `data/awardsData.ts` | `awards` (23), `awardCategories` (6), `getHighlightedAwards()`, `getAwardsByCategory()`, `getAwardCount()`, `Award` interface | `awards`, `award_categories` | AwardsPage |

### 6.4 Remaining Inline Data

| Component | Data | Type | Note |
|-----------|------|------|------|
| Navbar | `navLinks` (7 items) | Array of `{name, href}` | Small, UI-specific |
| WhyChooseUs | `features` (6 strings) | String array | Page-specific content |
| WhyChooseUs | Promise stats (4 items) | Inline `{num, label}` | Page-specific content |
| AboutPage | `values` (6 strings), `impactStats` (4) | Arrays | Page-specific content |

---

## 7. Data Flow

### 7.1 Current Architecture

The app uses a **centralized data layer** (`src/data/`) that simulates a real database. All entity data lives in typed TypeScript files. Components import only what they need. No backend, API, or external data source — but the structure is database-ready.

```
┌───────────────────────────────────────────────────────┐
│             CENTRALIZED DATA FLOW                    │
│                                                       │
│  src/data/ (simulated database)                       │
│    ├── blogData.ts      → BlogPage                    │
│    ├── doctorsData.ts   → AboutPage                   │
│    ├── servicesData.ts  → Services component, ServicesPage │
│    ├── contactData.ts   → Footer, Stats, Appointment,  │
│    │                      CTABanner                   │
│    ├── awardsData.ts    → AwardsPage                   │
│    └── reviewsData.ts   → (ready for testimonials)     │
│                                                       │
│  App.tsx (BrowserRouter)                              │
│    ├── Navbar ← navLinks[] (inline, UI-specific)       │
│    ├── Routes                                         │
│    │   ├── / → HomePage                               │
│    │   │    ├── Hero ← static JSX                     │
│    │   │    ├── Stats ← contactData.hospitalStats   │
│    │   │    ├── Services ← servicesData.services  │
│    │   │    ├── Appointment ← contactData.branches│
│    │   │    ├── WhyChooseUs ← inline features    │
│    │   │    └── CTABanner ← contactData.contactInfo│
│    │   ├── /about → AboutPage ← doctorsData      │
│    │   ├── /awards → AwardsPage ← awardsData     │
│    │   ├── /contact → ContactPage ← contactData  │
│    │   └── /blog → BlogPage ← blogData            │
│    └── Footer ← contactData (hospital, links, etc) │
└───────────────────────────────────────────────────────┘
```

### 7.2 State Management

| State Variable | Component | Type | Purpose |
|----------------|-----------|------|---------|
| `mobileOpen` | Navbar | `boolean` | Toggles mobile navigation menu |
| `selectedBranch` | AppointmentSection | `string` | Currently selected hospital branch |
| `selectedDate` | AppointmentSection | `number` | Selected calendar day number |
| `selectedTime` | AppointmentSection | `string` | Selected time slot string |
| `view` | BlogPage | `'listing' \| 'detail'` | Switches between blog listing and blog detail |
| `selectedSlug` | BlogPage | `string \| null` | Slug of currently viewed blog post |
| `activeCategory` | AwardsPage | `string` | Selected award category filter (default: "All") |
| `formData` | ContactPage | `{name, phone, email, message}` | Contact form field values |
| `submitted` | ContactPage | `boolean` | Shows success message after form submission |
| `selectedCategory` | BlogListing | `string` | Active category filter |
| `searchQuery` | BlogListing | `string` | Search input text |
| `isLiked` | BlogDetail | `boolean` | Whether user liked the post |
| `likes` | BlogDetail | `number` | Current like count |
| `scrollProgress` | BlogDetail | `number` | Reading progress percentage |
| `isBookmarked` | BlogDetail | `boolean` | Whether user bookmarked the post |

- **No global state** — all state is component-local via `useState`
- **No props passed** between components — each component is self-contained
- **No context providers** used
- **No data fetching** — no `useEffect`, no API calls, no async operations

### 7.3 User Interactions

| Action | Component | What Happens | Data Submitted? |
|--------|-----------|--------------|-----------------|
| Click nav link | Navbar | Full page reload to route (404) | No |
| Click hamburger | Navbar | Toggles `mobileOpen` state | No |
| Click "Book Appointment" | Navbar/Hero | No action (no handler/route) | No |
| Click "Explore Services" | Hero | No action | No |
| Click "Learn More" | Services | No action | No |
| Select branch | AppointmentSection | Updates `selectedBranch` state | No |
| Click calendar day | AppointmentSection | Updates `selectedDate` state | No |
| Click time slot | AppointmentSection | Updates `selectedTime` state | No |
| Type in form fields | AppointmentSection | Uncontrolled inputs (data not captured) | No |
| Click "Confirm Booking" | AppointmentSection | No action (no handler) | **No** |
| Click "Book Appointment" | CTABanner | Scrolls to `#appointment` section | No |
| Click "Call" | CTABanner | Opens phone dialer (`tel:` link) | No |
| Click footer links | Footer | Navigates via React Router `<Link>` | No |
| Search blogs | BlogListing | Filters posts by title/excerpt/tags | No |
| Click category filter | BlogListing | Filters posts by category | No |
| Click blog card | BlogListing | Opens blog detail view | No |
| Click "Back to Blog" | BlogDetail | Returns to listing view | No |
| Click Like button | BlogDetail | Toggles like, updates count | No (local only) |
| Click Share button | BlogDetail | Native share or copies URL | No |
| Click Bookmark | BlogDetail | Toggles bookmark state | No (local only) |
| Click related post | BlogDetail | Navigates to that post's detail | No |

### 7.4 Database Migration Path (Future)

The current `src/data/` files are structured to mirror real database tables. To connect a real backend:

1. **Replace static imports** with API fetch calls (e.g., `fetch('/api/doctors')` instead of `import { doctors }`).
2. **TypeScript interfaces stay the same** — `Doctor`, `Service`, `Review`, `Branch`, etc. become API response types.
3. **Add React Query or SWR** for data fetching, caching, and loading states.
4. **Add Context/Zustand** for global state (auth, cart, appointments).

```
┌────────────────────────────────────────────────────┐
│           FUTURE: DATABASE MIGRATION               │
│                                                    │
│  Current (static):     Future (API):               │
│  data/doctorsData.ts   GET /api/doctors            │
│  data/servicesData.ts  GET /api/services           │
│  data/blogData.ts      GET /api/blog/posts         │
│  data/contactData.ts   GET /api/hospital/info      │
│  data/reviewsData.ts   GET /api/reviews            │
│                                                    │
│  Interfaces remain shared via types/ folder        │
│  Components stay the same — only data source       │
│  changes from import to useQuery()                 │
└────────────────────────────────────────────────────┘
```

---

## 8. Assets

| File | Location | Used In |
|------|----------|---------|
| `logo.png` | `/public/logo.png` | Navbar, Footer |
| `hero.png` | `/public/hero.png` | Hero section |
| `vite.svg` | `/public/vite.svg` | Unused |

---

## 9. Known Issues Summary

| Category | Count | Key Issues |
|----------|-------|------------|
| Missing Pages | 5 | No router, 5 of 7 pages don't exist (Blog built) |
| Broken Links | 15+ | Nav links 404, footer links dead (#) |
| Accessibility | 8 | No aria labels, no form labels, no focus trap |
| Color/Contrast | 5 | `text-gray-400`/`text-gray-500` fail WCAG AA |
| Typography | 5 | Redundant font declarations, arbitrary values |
| Data/Content | 3 | Stale year (2024), inconsistent phone numbers |
| Forms | 3 | No validation, uncontrolled inputs, no submit handler |
| Layout | 4 | Section order, overflow risks, missing responsive handling |

---

## 10. About Page — Detailed Breakdown

**File:** `src/pages/AboutPage.tsx`

### 10.1 Sections

| # | Section | Background | Key Elements |
|---|---------|------------|--------------|
| 1 | Hero Banner | `bg-[hsl(var(--primary))]` | Title, description, CTA buttons (Contact / Services), side image with floating stat badge |
| 2 | Mission & Vision | `bg-white` | Two side-by-side cards with hover effects, icon, heading, description |
| 3 | Experience & Impact | `bg-[hsl(var(--primary))]` | 4 stat cards (40+ Years, 95K+ Patients, Multiple Branches, 15+ Awards) |
| 4 | Our Story & Values | `bg-gray-50` | Left: gradient card with legacy text & mini stats grid. Right: core values checklist (6 items) |
| 5 | Our Doctors | `bg-white` | 4 doctor cards in responsive grid (sm:2, lg:4 cols). Each card has image, name, speciality, qualifications, experience, book appointment link, LinkedIn icon |
| 6 | CTA | `bg-[hsl(var(--primary))]` | Book Appointment + Call Us buttons |

### 10.2 Inline Data
- **Doctors array:** 4 entries — `{ name, speciality, qualifications, experience, image }` (placeholder `/hero.png`)
- **Core Values:** 6 strings
- **Impact Stats:** 4 entries — `{ icon (JSX), value, label }`

### 10.3 Dependencies
- `react-router-dom` — `Link` for internal navigation (Contact, Services)
- No external data file — data is inline in the component

---

## 11. Blog Page — Detailed Breakdown

### 11.1 Data File
- **File:** `src/data/blogData.ts`
- **Exports:** `blogPosts` (array), `blogCategories` (array), `BlogPost` (TypeScript interface)
- **BlogPost interface:**
  ```
  id, slug, title, excerpt, content (multi-paragraph with ## headings),
  author, date, category, readTime, views, likes, image, trending, tags[]
  ```
- **6 blog posts:** LASIK guide, Digital Eye Strain, Glaucoma Warning Signs, Children's Eye Health, Nutrition & Eye Health, Cataract Surgery
- **7 categories:** All, LASIK, Eye Health, Glaucoma, Cataract, Pediatric, Nutrition

### 11.2 Blog Listing View
- **Hero Banner:** Primary bg with dot pattern, animated badge, heading, subtitle, search bar
- **Category Filters:** Sticky pill buttons below navbar, horizontally scrollable
- **Featured Post:** Full-width card with image + content side-by-side (shows first trending post)
- **Blog Grid:** 3-column responsive grid (`md:grid-cols-2 lg:grid-cols-3`)
- **Each Card:** Image with category badge + trending indicator, title, excerpt, meta (date, read time, views, likes), accent bar on hover
- **Empty State:** Search icon + "No articles found" message

### 11.3 Blog Detail View
- **Reading Progress Bar:** Fixed top, gradient from primary to accent
- **Back Bar:** Back button + bookmark/share actions
- **Hero:** Category badge, large title, author/date/readTime/views meta, full-width hero image
- **Content:** 2/3 + 1/3 grid (article + sidebar)
- **Article:** Paragraphs with `## ` headings rendered as styled h2s, tags section, like/share buttons
- **Sidebar (sticky):** Reading progress bar with percentage, related articles list
- **Related Posts:** Filtered by same category, max 3, clickable with navigation
- **State-based navigation:** Uses CustomEvent `openBlogPost` for related post navigation

### 11.4 Design Alignment
- Colors: Uses `hsl(var(--primary))` and `hsl(var(--accent))` consistently
- Fonts: `font-[Outfit]` for all headings, Inter (default) for body
- Patterns: Same container (`container mx-auto px-4 md:px-6`), same shadow/rounded styles
- Icons: Inline SVGs (consistent with rest of codebase)
- Includes Navbar and Footer wrapper

---

*This document serves as the single source of truth for the Galaxy Eye Hospital frontend project.*
