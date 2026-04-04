import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

import { localId, readLocalAdminStore, writeLocalAdminStore } from '@/lib/data/local-admin-store';
import { clientDb } from '@/lib/firebase/client';
import { Lead, Product, SiteConfig, Testimonial } from '@/lib/types/entities';

const COLLECTIONS = {
  leads: 'leads',
  products: 'products',
  testimonials: 'testimonials',
  config: 'siteConfig'
} as const;

function normalizeDoc<T extends { id?: string }>(id: string, data: Omit<T, 'id'>): T {
  return { id, ...(data as T) };
}

export async function addLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
  const db = clientDb;
  const payload = {
    ...lead,
    createdAt: new Date().toISOString(),
    createdAtServer: serverTimestamp()
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

  const ref = await addDoc(collection(db, COLLECTIONS.leads), payload);
  return { id: ref.id, ...payload };
}

export async function listLeads() {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    return store.leads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const q = query(collection(db, COLLECTIONS.leads), orderBy('createdAtServer', 'desc'), limit(500));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => normalizeDoc<Lead>(d.id, d.data() as Omit<Lead, 'id'>));
}

export async function listProducts() {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    return store.products.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  const q = query(collection(db, COLLECTIONS.products), orderBy('displayOrder', 'asc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const store = await readLocalAdminStore();
    return store.products.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  return snapshot.docs.map((d) => normalizeDoc<Product>(d.id, d.data() as Omit<Product, 'id'>));
}

export async function getProduct(id: string) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    return store.products.find((p) => p.id === id) || null;
  }

  const docRef = doc(db, COLLECTIONS.products, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return normalizeDoc<Product>(docSnap.id, docSnap.data() as Omit<Product, 'id'>);
}

export async function createProduct(product: Product) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    const savedProduct: Product = { ...product, id: localId('product') };
    store.products = [...store.products, savedProduct];
    await writeLocalAdminStore(store);
    return savedProduct;
  }

  const ref = await addDoc(collection(db, COLLECTIONS.products), product);
  return { id: ref.id, ...product };
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    store.products = store.products.map((item) => (item.id === id ? { ...item, ...product } : item));
    await writeLocalAdminStore(store);
    return;
  }
  await setDoc(doc(db, COLLECTIONS.products, id), product, { merge: true });
}

export async function deleteProduct(id: string) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    store.products = store.products.filter((item) => item.id !== id);
    await writeLocalAdminStore(store);
    return;
  }
  await deleteDoc(doc(db, COLLECTIONS.products, id));
}

export async function listTestimonials() {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    return store.testimonials.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const q = query(collection(db, COLLECTIONS.testimonials), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const store = await readLocalAdminStore();
    return store.testimonials.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  return snapshot.docs.map((d) => normalizeDoc<Testimonial>(d.id, d.data() as Omit<Testimonial, 'id'>));
}

export async function createTestimonial(testimonial: Testimonial) {
  const db = clientDb;
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

  const ref = await addDoc(collection(db, COLLECTIONS.testimonials), testimonial);
  return { id: ref.id, ...testimonial };
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    store.testimonials = store.testimonials.map((item) =>
      item.id === id ? { ...item, ...testimonial } : item
    );
    await writeLocalAdminStore(store);
    return;
  }
  await setDoc(doc(db, COLLECTIONS.testimonials, id), testimonial, { merge: true });
}

export async function deleteTestimonial(id: string) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    store.testimonials = store.testimonials.filter((item) => item.id !== id);
    await writeLocalAdminStore(store);
    return;
  }
  await deleteDoc(doc(db, COLLECTIONS.testimonials, id));
}

export async function getSiteConfig() {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    return store.siteConfig;
  }

  const docRef = doc(db, COLLECTIONS.config, 'default');
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const store = await readLocalAdminStore();
    return store.siteConfig;
  }

  return normalizeDoc<SiteConfig>(docSnap.id, docSnap.data() as Omit<SiteConfig, 'id'>);
}

export async function updateSiteConfig(config: SiteConfig) {
  const db = clientDb;
  if (!db) {
    const store = await readLocalAdminStore();
    store.siteConfig = { ...config, id: 'default' };
    await writeLocalAdminStore(store);
    return;
  }

  await setDoc(doc(db, COLLECTIONS.config, 'default'), config, { merge: true });
}
