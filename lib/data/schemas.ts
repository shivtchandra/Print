import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{8,15}$/;

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  email: z.string().email().optional().or(z.literal('')),
  category: z.enum([
    'laptops',
    'gaming-desktops',
    'printers',
    'cctv',
    'assembled-desktops',
    'accessories'
  ]),
  message: z.string().min(10).max(600),
  sourcePage: z.string().min(1).max(200),
  preferredContact: z.enum(['phone', 'whatsapp', 'email'])
});

export const productSchema = z.object({
  title: z.string().min(2).max(120),
  category: z.enum([
    'laptops',
    'gaming-desktops',
    'printers',
    'cctv',
    'assembled-desktops',
    'accessories'
  ]),
  brand: z.string().min(2).max(80),
  priceRange: z.string().min(2).max(80),
  specs: z.array(z.string()).min(1),
  features: z.array(z.string()).min(1),
  images: z.array(z.string().url()).min(1),
  description: z.string().max(1000).optional(),
  isFeatured: z.boolean(),
  displayOrder: z.number().int().min(0),
  status: z.enum(['active', 'inactive'])
});

export const testimonialSchema = z.object({
  customerName: z.string().min(2).max(80),
  quote: z.string().min(10).max(400),
  rating: z.number().int().min(1).max(5).optional(),
  location: z.string().max(80).optional(),
  isPublished: z.boolean()
});

export const heroSlideSchema = z.object({
  title: z.string().min(2).max(120),
  subtitle: z.string().min(2).max(400),
  image: z.string().url()
});

const laptopCustomizationOptionSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(80),
  price: z.number().min(0)
});

const laptopCustomizationCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(60),
  options: z.array(laptopCustomizationOptionSchema).min(1)
});

const laptopCustomizationSchema = z.object({
  categories: z.array(laptopCustomizationCategorySchema).default([])
});

const aboutPageContentSchema = z.object({
  heroTitle: z.string().min(2).max(120),
  introParagraphs: z.array(z.string().min(2).max(500)).min(1),
  whyTitle: z.string().min(2).max(120),
  whyBullets: z.array(z.string().min(1).max(140)).min(1)
});

export const businessInfoSchema = z.object({
  name: z.string().min(2).max(100),
  tagline: z.string().max(100),
  description: z.string().max(500),
  phones: z.array(z.string()),
  whatsapp: z.string(),
  email: z.string().email(),
  address: z.string().max(300),
  hours: z.string().max(100),
  copyright: z.string().max(100),
  googleMapEmbed: z.string().url()
});

export const siteConfigSchema = z.object({
  businessInfo: businessInfoSchema,
  heroSlides: z.array(heroSlideSchema),
  aboutPage: aboutPageContentSchema,
  laptopCustomization: laptopCustomizationSchema
});
