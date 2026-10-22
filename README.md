# ONE DAY CREW® (ODC)

> **MEDIA / MARKETING / CREATIVE**  
> *"For the things you're here to do."*  
> Independent Creative Crew — Based in India · Working Everywhere.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

---

## ⚡ Overview

**One Day Crew** is a contemporary, conversion-engineered digital flagship and portfolio for an independent creative collective. Built for speed, brutalist aesthetic charm, and zero-friction lead generation across desktop and mobile devices.

---

## 🌟 Key Features

- **⚡ Zero-Friction Lead Generation**:
  - Two-field quick capture (**Name** & **Phone / WhatsApp Number**).
  - Background asynchronous write straight to **Supabase** `leads` table.
  - Automatic redirect to **WhatsApp (`+91 9353736101`)** with a clean, pre-filled client message.
  - No broken `mailto:` traps — 100% lead capture resilience.
- **🎨 Rich Editorial Aesthetics**:
  - Custom fluid typography with Google Fonts (*Space Grotesk*, *DM Sans*, *DM Mono*).
  - Tactile layered collage layouts, authentic noise grain overlay, dynamic dark/light side switch with audio feedback.
  - Animated sound-wave meters, floating stamps, and rotating orbital badges.
- **💼 Dynamic Ventures & Collaborators Showcase**:
  - **Butterly Bakery**: Artisanal bakery brand world & digital flagship.
  - **Blue Peak**: Luxury real estate development & architectural platform.
  - **Giggs**: Upcoming zero-barrier gig economy platform.
  - **RatePulse**: Upcoming retail & wholesale transparent price-matching app.
  - **Butcherly**: Upcoming artisanal cold-chain meat brand.
  - **Creator Circle**: Upcoming tastemaker & aesthetic influencer deployment for landmark events.
- **📱 Mobile-First Native Ergonomics**:
  - Uncluttered responsive top navigation.
  - Non-intrusive watermark background star styling.
  - Infinite draggable and touch-swipeable client marquee with hidden scrollbars.
  - Contextual smart pre-selection (e.g., clicking *"Build something like this"* in any case study pre-populates the requirement in the contact brief).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: Vanilla CSS with full CSS Custom Property tokens (`index.css`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/onedaycrew/OneDayCrew.git
cd OneDayCrew
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WHATSAPP_NUMBER=919353736101
```

### 4. Start the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🗄️ Supabase Database Setup

To enable lead generation in Supabase:

1. Open your **Supabase Dashboard** > **SQL Editor**.
2. Run the following query:

```sql
create table if not exists leads (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  service text default 'General'
);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;

-- Allow public website visitors to insert leads
create policy "Allow public to submit leads"
on leads for insert
to anon
with check (true);
```

---

## 🌐 Deploy to Vercel (1-Click Setup)

This repository includes a production-ready [`vercel.json`](./vercel.json).

### Method A: Connect through Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com/) and click **Add New... > Project**.
2. Import the `onedaycrew/OneDayCrew` repository.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: `https://vqihxhrhmnzxsdhesufb.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: *(Your Supabase anon key)*
   - `VITE_WHATSAPP_NUMBER`: `919353736101`
4. Click **Deploy**. Vercel will automatically build and assign a global CDN domain.

### Method B: Deploy using Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📁 Project Structure

```text
├── .env.example              # Environment variables template
├── vercel.json               # Vercel SPA routing and caching configuration
├── index.html                # HTML entry point with metadata & SEO tags
├── vite.config.js            # Vite build configuration
├── package.json              # Project dependencies & build scripts
└── src/
    ├── App.jsx               # Main application controller
    ├── main.jsx              # React DOM mounting
    ├── index.css             # Unified global design system & tokens
    ├── components/
    │   ├── Header.jsx        # Top navigation with WhatsApp quick-call
    │   ├── Hero.jsx          # Live IST studio clock & bold typography
    │   ├── Ticker.jsx        # Infinite philosophy ticker marquee
    │   ├── Manifesto.jsx     # Brand statement & purpose
    │   ├── ClientMarquee.jsx # Draggable, swipeable client partners marquee
    │   ├── Showreel.jsx      # Video reel showcase
    │   ├── WorkShowcase.jsx  # "Made of Many Things" interactive ventures
    │   ├── Services.jsx      # Core offerings breakdown
    │   ├── Process.jsx       # 3-step agile execution model
    │   ├── Careers.jsx       # Talent & apprenticeship openings
    │   ├── BigCTA.jsx        # High-impact conversation conversion trigger
    │   ├── Footer.jsx        # Colophon & sitemap links
    │   ├── Modals/           # Slide-out drawers & case study overlays
    │   └── UI/               # Reusable UI primitives (Toast notifications)
    ├── data/
    │   └── content.js        # Single source of truth for site content & copy
    └── lib/
        └── supabaseClient.js # Secure Supabase client & lead capture handler
```

---

## 📄 License
Private repository & proprietary work © 2026 One Day Crew. All rights reserved.
