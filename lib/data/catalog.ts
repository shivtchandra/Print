import { CategoryMeta, HeroSlide, Product, ProductCategory, Testimonial } from '@/lib/types/entities';

export const categoryMeta: Record<ProductCategory, CategoryMeta> = {
  laptops: {
    slug: 'laptops',
    label: 'Laptops',
    shortLabel: 'Laptop Deals',
    heroTitle: 'Premium Laptops for Work & Play',
    heroSubtitle: 'Gaming, business, and budget laptops with reliable local support.',
    heroImage: '',
    seoTitle: 'Laptops Jorhat | Foto Palace',
    seoDescription:
      'Buy Dell, HP, Lenovo, ASUS laptops in Jorhat at Foto Palace, Gar-Ali. Student, gaming, and business models with EMI and local warranty support. WhatsApp 9435051891.'
  },
  'gaming-desktops': {
    slug: 'gaming-desktops',
    label: 'Gaming Desktops',
    shortLabel: 'Gaming PCs',
    heroTitle: 'Ultimate Gaming Desktops - Built to Win',
    heroSubtitle: 'High-FPS setups, RGB aesthetics, and custom upgrades for every gamer.',
    heroImage: '',
    seoTitle: 'Gaming Desktop Store Jorhat | Foto Palace',
    seoDescription:
      'Custom gaming PCs in Jorhat — RTX builds, RGB, liquid cooling. Foto Palace Gar-Ali assembles and stress-tests every rig. Call 9435051891 for a quote.'
  },
  printers: {
    slug: 'printers',
    label: 'Printers',
    shortLabel: 'Printers',
    heroTitle: 'Reliable Printers for Every Need',
    heroSubtitle: 'Home, office, and bulk printing solutions with expert recommendations.',
    heroImage: '',
    seoTitle: 'Printer Shop Jorhat | Foto Palace',
    seoDescription:
      'HP, Canon, Epson printers in Jorhat — tank, laser, and office MFPs. Foto Palace Gar-Ali stocks models with low running cost. Visit or WhatsApp 9435051891.'
  },
  cctv: {
    slug: 'cctv',
    label: 'CCTV',
    shortLabel: 'Security CCTV',
    heroTitle: 'Secure Your World with CCTV',
    heroSubtitle: 'Smart surveillance systems with professional installation support.',
    heroImage: '',
    seoTitle: 'CCTV Installation Jorhat | Foto Palace',
    seoDescription:
      'Hikvision & CP Plus CCTV in Jorhat — home kits, shop packages, night vision. Professional installation from Foto Palace, Gar-Ali. Enquire on WhatsApp.'
  },
  'assembled-desktops': {
    slug: 'assembled-desktops',
    label: 'Assembled Desktops',
    shortLabel: 'Custom Builds',
    heroTitle: 'Custom Assembled Desktops - Tailored for You',
    heroSubtitle: 'Component-level customization, testing, and in-store assembly by experts.',
    heroImage: '',
    seoTitle: 'Assembled Desktop Jorhat | Foto Palace',
    seoDescription:
      'Assembled desktops in Jorhat for office, CAD, and home. Pick CPU, RAM, and storage at Foto Palace Gar-Ali — built and tested on site. 9435051891.'
  },
  accessories: {
    slug: 'accessories',
    label: 'IT Accessories',
    shortLabel: 'Accessories',
    heroTitle: 'All IT Accessories Under One Roof',
    heroSubtitle: 'Peripherals, cables, monitors, power backup, and more for every setup.',
    heroImage: '',
    seoTitle: 'IT Accessories Jorhat | Foto Palace',
    seoDescription:
      'IT accessories in Jorhat — monitors, UPS, routers, keyboards, headsets. Foto Palace Gar-Ali stocks Dell, Logitech, TP-Link, APC. Open 10am–9pm.'
  }
};

/** No built-in catalogue — add products in Admin or Firestore. */
export const defaultProducts: Product[] = [];

/** No built-in reviews — add testimonials in Admin or Firestore. */
export const defaultTestimonials: Testimonial[] = [];

/** No built-in hero slides — add slides in Admin → Settings (each slide needs a real image URL). */
export const heroSlides: HeroSlide[] = [];

export const printerComparison = [
  {
    type: 'Inkjet',
    speed: '10-20 ppm',
    cost: '₹0.5 - ₹1',
    bestFor: 'Photos/Home'
  },
  {
    type: 'Laser',
    speed: '20-40 ppm',
    cost: '₹0.2 - ₹0.5',
    bestFor: 'Office/Volume'
  }
];

export const productFeaturesByCategory: Record<ProductCategory, string[]> = {
  laptops: ['Gaming laptops with RGB keyboards', 'Business ultrabooks', 'Budget options under ₹50,000'],
  'gaming-desktops': ['Pre-built and custom assembly', 'RGB lighting + liquid cooling', 'Entry to pro price tiers'],
  printers: ['Inkjet and laser options', 'Wireless multifunction models', 'Bulk deals for offices'],
  cctv: ['Wireless IP cameras', '4/8-channel DVR kits', 'Night vision and mobile app support'],
  'assembled-desktops': ['Select parts by budget', 'In-store assembly & testing', 'Performance-focused recommendations'],
  accessories: ['Gaming peripherals', 'Cables/hubs/chargers', 'Bags, stands, UPS, and monitors']
};
