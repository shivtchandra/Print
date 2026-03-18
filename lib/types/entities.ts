export type ProductCategory =
  | 'laptops'
  | 'gaming-desktops'
  | 'printers'
  | 'cctv'
  | 'assembled-desktops'
  | 'accessories';

export type LeadPreferredContact = 'phone' | 'whatsapp' | 'email';

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  category: ProductCategory;
  message: string;
  sourcePage: string;
  preferredContact: LeadPreferredContact;
  createdAt: string;
}

export interface Product {
  id?: string;
  title: string;
  category: ProductCategory;
  brand: string;
  priceRange: string;
  specs: string[];
  features: string[];
  images: string[];
  description?: string;
  isFeatured: boolean;
  displayOrder: number;
  status: 'active' | 'inactive';
}

export interface Testimonial {
  id?: string;
  customerName: string;
  quote: string;
  rating?: number;
  location?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface CategoryMeta {
  slug: ProductCategory;
  label: string;
  shortLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

export interface LaptopCustomizationOption {
  id?: string;
  label: string;
  price: number;
}

export interface LaptopCustomizationCategory {
  id?: string;
  name: string;
  options: LaptopCustomizationOption[];
}

export interface LaptopCustomizationConfig {
  categories: LaptopCustomizationCategory[];
}

export interface AboutPageContent {
  heroTitle: string;
  introParagraphs: string[];
  whyTitle: string;
  whyBullets: string[];
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  copyright: string;
  googleMapEmbed: string;
}

export interface SiteConfig {
  id?: string;
  businessInfo: BusinessInfo;
  heroSlides: HeroSlide[];
  aboutPage: AboutPageContent;
  laptopCustomization: LaptopCustomizationConfig;
}
