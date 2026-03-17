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
