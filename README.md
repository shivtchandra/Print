# Foto Palace Website (Next.js + Firebase)

Production-ready website for **Foto Palace**, built with Next.js App Router, TypeScript, and Firebase.

## Features

- Mobile-first responsive storefront pages
- Category pages: Laptops, Gaming Desktops, Printers, CCTV, Assembled Desktops, IT Accessories
- Lead capture forms with API validation and rate limiting
- WhatsApp / click-to-call / email / map actions
- SEO setup: metadata, canonical tags, robots, sitemap, JSON-LD schema
- GA4 integration hooks for conversions
- Admin panel with Firebase Auth + Firestore CRUD:
  - Lead inbox with search/filter/export CSV
  - Product management (create/edit/delete)
  - Testimonial management (create/edit/delete)

## Stack

- Next.js 15 + TypeScript
- Firebase Auth, Firestore, Storage
- Zod validation for API payloads

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env template and fill values:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Required Environment Variables

Set all keys in `.env.local`:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## Firebase Notes

- Enable **Authentication > Email/Password**.
- Create one owner admin user in Firebase Auth.
- Firestore collections used:
  - `leads`
  - `products`
  - `testimonials`

## Deployment

Recommended:

- Frontend: Vercel
- Data/Auth: Firebase

Set the same environment variables in Vercel project settings before deploying.
