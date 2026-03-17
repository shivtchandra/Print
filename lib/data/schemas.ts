import { z } from 'zod';

const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(phoneRegex, 'Invalid Indian mobile number'),
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
