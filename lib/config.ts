/** Single canonical NAP (Name / Address / Phone) for storefront + schema */
export const businessInfo = {
  name: 'Foto Palace',
  tagline: "Jorhat's trusted tech store",
  description:
    'Laptops | Gaming Desktops | Printers | CCTV | Assembled Desktops | IT Accessories',
  phones: ['9435051891', '9954489045'],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919435051891',
  email: 'fotopalace@gmail.com',
  /** Full line for footer, schema, and legal consistency */
  address: 'Gar-Ali, near Eleye Cinema, Jorhat, Assam — 785001',
  hours: '10:00 AM - 9:00 PM',
  copyright: '© 2026 Foto Palace',
  googleMapEmbed:
    'https://www.google.com/maps?q=Gar-Ali+near+Eleye+Cinema+Jorhat+Assam+785001&output=embed'
};

/**
 * Replace with your Google Business Profile “Ask for reviews” link when available.
 * Until then this opens Maps search for the store (customers can leave reviews from Maps).
 */
export const googleBusinessProfileReviewUrl =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
  'https://www.google.com/maps/search/?api=1&query=Foto+Palace+Gar-Ali+Jorhat+Assam';

export const socialLinks = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/fotopalace_jorhat',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/fotopalace.jorhat',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@FotoPalaceJorhat',
  whatsapp: 'https://wa.me/919435051891'
};

export const seoKeywords = [
  'laptop store Jorhat',
  'gaming desktop store Jorhat',
  'printer shop Jorhat',
  'CCTV installation Jorhat',
  'assembled desktop Jorhat',
  'IT accessories Jorhat',
  'Foto Palace Assam',
  'Gar-Ali Eleye Cinema tech shop',
  'best computer shop in Jorhat'
];
