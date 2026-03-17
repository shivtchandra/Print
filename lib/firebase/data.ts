import { FieldValue } from 'firebase-admin/firestore';

import { localId, readLocalAdminStore, writeLocalAdminStore } from '@/lib/data/local-admin-store';
import { getAdminDb } from '@/lib/firebase/admin';
import { Lead, Product, Testimonial } from '@/lib/types/entities';

const COLLECTIONS = {
  leads: 'leads',
  products: 'products',
  testimonials: 'testimonials'
} as const;

function normalizeDoc<T extends { id?: string }>(id: string, data: Omit<T, 'id'>): T {
  return { id, ...(data as T) };
}

export async function addLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
  const db = getAdminDb();
  const payload = {
    ...lead,
    createdAt: new Date().toISOString(),
    createdAtServer: FieldValue.serverTimestamp()
  };

  if (!db) {
    const store = await readLocalAdminStore();
    const localLead: Lead = {
      id: localId('lead'),
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      category: lead.category,
      message: lead.message,
      sourcePage: lead.sourcePage,
      preferredContact: lead.preferredContact,
      createdAt: new Date().toISOString()
    };
    store.leads = [localLead, ...store.leads];
    await writeLocalAdminStore(store);
    return localLead;
  }

  const ref = await db.collection(COLLECTIONS.leads).add(payload);
  return { id: ref.id, ...payload };
}

export async function listLeads() {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    return store.leads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const snapshot = await db
    .collection(COLLECTIONS.leads)
    .orderBy('createdAtServer', 'desc')
    .limit(500)
    .get();

  return snapshot.docs.map((doc) => normalizeDoc<Lead>(doc.id, doc.data() as Omit<Lead, 'id'>));
}

export async function listProducts() {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    return store.products.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  const snapshot = await db.collection(COLLECTIONS.products).orderBy('displayOrder', 'asc').get();

  if (snapshot.empty) {
    const store = await readLocalAdminStore();
    return store.products.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  return snapshot.docs.map((doc) => normalizeDoc<Product>(doc.id, doc.data() as Omit<Product, 'id'>));
}

export async function createProduct(product: Product) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    const savedProduct: Product = { ...product, id: localId('product') };
    store.products = [...store.products, savedProduct];
    await writeLocalAdminStore(store);
    return savedProduct;
  }

  const ref = await db.collection(COLLECTIONS.products).add(product);
  return { id: ref.id, ...product };
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    store.products = store.products.map((item) => (item.id === id ? { ...item, ...product } : item));
    await writeLocalAdminStore(store);
    return;
  }
  await db.collection(COLLECTIONS.products).doc(id).set(product, { merge: true });
}

export async function deleteProduct(id: string) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    store.products = store.products.filter((item) => item.id !== id);
    await writeLocalAdminStore(store);
    return;
  }
  await db.collection(COLLECTIONS.products).doc(id).delete();
}

export async function listTestimonials() {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    return store.testimonials.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const snapshot = await db.collection(COLLECTIONS.testimonials).orderBy('createdAt', 'desc').get();
  if (snapshot.empty) {
    const store = await readLocalAdminStore();
    return store.testimonials.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  return snapshot.docs.map((doc) => normalizeDoc<Testimonial>(doc.id, doc.data() as Omit<Testimonial, 'id'>));
}

export async function createTestimonial(testimonial: Testimonial) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    const savedTestimonial: Testimonial = {
      ...testimonial,
      id: localId('testimonial'),
      createdAt: testimonial.createdAt || new Date().toISOString()
    };
    store.testimonials = [savedTestimonial, ...store.testimonials];
    await writeLocalAdminStore(store);
    return savedTestimonial;
  }

  const ref = await db.collection(COLLECTIONS.testimonials).add(testimonial);
  return { id: ref.id, ...testimonial };
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    store.testimonials = store.testimonials.map((item) =>
      item.id === id ? { ...item, ...testimonial } : item
    );
    await writeLocalAdminStore(store);
    return;
  }
  await db.collection(COLLECTIONS.testimonials).doc(id).set(testimonial, { merge: true });
}

export async function deleteTestimonial(id: string) {
  const db = getAdminDb();
  if (!db) {
    const store = await readLocalAdminStore();
    store.testimonials = store.testimonials.filter((item) => item.id !== id);
    await writeLocalAdminStore(store);
    return;
  }
  await db.collection(COLLECTIONS.testimonials).doc(id).delete();
}
