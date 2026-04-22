# 🎬 OceanTix v2

**OceanTix** is a mobile-first movie ticket booking web app built with **Next.js 16**, **React 19**, and **Supabase**. It lets users browse now-playing and upcoming films, pick their city, view showtimes by cinema, watch trailers, and book tickets — all from a sleek, dark-themed interface.

---

## ✨ Features

### 🌍 Location-Based Cinema Filtering
Users can tap the location pill in the navbar to open a searchable city picker. The selected city (e.g. **Tasikmalaya**) filters the cinema list inside the movie schedule tab — only theatres in that city will appear. This makes it easy for users in smaller cities like Tasikmalaya to find their local XXI or CGV without wading through irrelevant options.

### 🎞️ Now Playing & Coming Soon
- **Now Playing** — fetches currently screening movies from the TMDB API (`/api/movies/now-playing`), filtered to only show films whose release date is today or earlier.
- **Coming Soon** — fetches upcoming films (`/api/movies/upcoming`), filtered to only show films releasing in the future.
- Both sections show age rating, runtime, genre, rating score, and cast details fetched from TMDB in real-time.

### 🎬 Movie Detail Page
Clicking **Beli Tiket** (Buy Ticket) on any now-playing film opens the `MovieDetailPage` component, which includes:

- **Hero section** — blurred backdrop image, movie poster, title, genre, runtime, and age rating badge.
- **Trailer tab** — opens the official YouTube trailer in a fullscreen modal overlay.
- **Schedule tab (`Jadwal`)** — date picker (today + 6 days), searchable cinema list, filter panel (sort by nearest/cheapest/A-Z, filter by brand XXI/CGV, toggle 2D/3D format), and showtime buttons.
- **Detail tab** — synopsis, director, writer, studio/production company, and a cast grid with profile photos.

### 🗓️ Schedule & Showtime Picker
Inside the movie detail page, the **Jadwal** tab shows:
1. A horizontal date strip (today → 6 days ahead).
2. A cinema search bar and a collapsible filter panel.
3. A list of theatres for the selected city, each showing its name, distance, ticket price (2D or 3D), and available showtime slots (12:00, 14:15, 16:30, 18:45, 21:00).
4. A **Beli Tiket** button at the bottom of each cinema card.

> **Note:** Cinema data is currently stored as in-app dummy data (`DUMMY_THEATERS` in `MovieDetail.tsx`). In a future version this will be replaced by a live Supabase database query filtered by `selectedCity`.

### 🔐 Authentication (Supabase)
- **Login / Register** — email + password flow via Supabase Auth.
- **Forgot Password** — WhatsApp OTP flow (phone number → OTP code input).
- **Google OAuth** — "Lanjut Google" button (handler wired up, ready to be connected).
- Persistent session: session is restored on page load and synced via `onAuthStateChange`.
- Once logged in the navbar shows a notification bell instead of the Login/Register buttons.

### 📱 Mobile-First Design
- Fixed bottom navigation bar (`BottomNav.tsx`) provides thumb-friendly navigation.
- Sticky top navbar collapses the search bar on mobile when scrolled.
- Movie poster grids, banner carousels, and date pickers all use horizontal `snap-x` scroll with hidden scrollbars — optimised for swipe on touch screens.
- All breakpoints use `md:` prefixes (768 px) to expand the layout for tablets and desktops.

### 🌊 Animated Background
The homepage features a layered animated ocean-wave background built with pure CSS `@keyframes` and SVG mask images — no external libraries required.

### 🎠 Auto-scrolling Promo Banner
A looping carousel of promotional banners auto-scrolls every 3 seconds. It pauses on hover (desktop) and supports manual left/right navigation arrows. The banner array is tripled internally to create an infinite-loop illusion.

---

## 🗂️ Project Structure

```
oceantix-v2/
├── app/
│   ├── page.tsx           # Home page — navbar, banner, Now Playing, Coming Soon, Auth modal, Location modal
│   ├── MovieDetail.tsx    # Movie detail page — hero, trailer modal, schedule tab, detail tab
│   ├── layout.tsx         # Root layout (font, metadata)
│   ├── globals.css        # Global styles
│   ├── api/
│   │   └── movies/
│   │       ├── now-playing/   # Next.js Route Handler → TMDB now-playing proxy
│   │       └── upcoming/      # Next.js Route Handler → TMDB upcoming proxy
│   ├── auth/
│   │   └── callback/          # Supabase OAuth callback handler
│   ├── cinemas/               # (Reserved) Cinema listing page
│   ├── profile/               # (Reserved) User profile page
│   └── ticket/                # (Reserved) Ticket confirmation / history page
├── components/
│   └── BottomNav.tsx      # Fixed bottom navigation bar (mobile)
├── lib/
│   └── supabase.ts        # Supabase client (persistent session, implicit flow)
├── public/                # Static assets
├── .env.local             # Environment variables (see setup below)
├── next.config.ts         # Next.js config
├── tailwind.config        # Tailwind CSS v4 (via PostCSS)
└── package.json
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Backend / Auth | Supabase (Auth + DB) |
| Movie Data | TMDB API (The Movie Database) |
| Language | TypeScript |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [TMDB API key](https://www.themoviedb.org/settings/api)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How the Booking Flow Works

```
Home Page
   │
   ├─ Pick city (Location Modal) ─────────────────────────────────────────┐
   │    └─ Searchable list of 60+ Indonesian cities                       │
   │         └─ selectedCity saved in React state                         │
   │                                                                       │
   ├─ Browse "Now Playing" posters (horizontal scroll)                    │
   │    └─ Hover → Trailer button + Beli Tiket button                     │
   │                                                                       │
   └─ Click "Beli Tiket" ──────────────────────────────────────────────── ▼
                                                             MovieDetailPage
                                                                   │
                                              ┌────────────────────┴──────────────────────┐
                                              │  Tab: JADWAL                               │  Tab: DETAIL
                                              │  1. Pick a date (today + 6 days)           │  - Synopsis
                                              │  2. Filter cinemas by brand / format       │  - Director / Writer
                                              │  3. See cinemas in selectedCity only       │  - Studio
                                              │  4. Pick a showtime slot                   │  - Cast grid
                                              │  5. Click "Beli Tiket" per cinema          │
                                              └────────────────────────────────────────────┘
```

---

## 📡 API Routes

| Route | Description |
|---|---|
| `GET /api/movies/now-playing` | Proxies TMDB `/movie/now_playing` — keeps the API key server-side |
| `GET /api/movies/upcoming` | Proxies TMDB `/movie/upcoming` — keeps the API key server-side |

---

## 🛣️ Roadmap / Future Plans

- [ ] Connect cinema data to Supabase DB (replace dummy data), filtered by `selectedCity`
- [ ] Real showtime data per cinema per date
- [ ] Seat selection UI
- [ ] Payment gateway integration
- [ ] User profile page (`/profile`) — booking history, saved cards
- [ ] Push notifications for upcoming movie reminders
- [ ] Google OAuth fully wired up
- [ ] `/cinemas` page — browse all cinemas by city

---

## 📄 License

Private project — all rights reserved.
