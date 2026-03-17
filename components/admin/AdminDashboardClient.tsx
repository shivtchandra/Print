'use client';

import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';

import {
  STATIC_ADMIN_EMAIL,
  STATIC_ADMIN_EMAIL_STORAGE_KEY,
  STATIC_ADMIN_TOKEN,
  STATIC_ADMIN_TOKEN_STORAGE_KEY
} from '@/lib/admin/static-admin';
import { clientAuth, clientFirebaseReady } from '@/lib/firebase/client';
import { toCsv } from '@/lib/utils/format';
import { Lead, Product, ProductCategory, Testimonial } from '@/lib/types/entities';

const categories: ProductCategory[] = [
  'laptops',
  'gaming-desktops',
  'printers',
  'cctv',
  'assembled-desktops',
  'accessories'
];

type ProductForm = {
  title: string;
  category: ProductCategory;
  brand: string;
  priceRange: string;
  specs: string;
  features: string;
  images: string;
  isFeatured: boolean;
  displayOrder: number;
  status: 'active' | 'inactive';
};

type TestimonialForm = {
  customerName: string;
  quote: string;
  rating: number;
  location: string;
  isPublished: boolean;
};

const defaultProductForm: ProductForm = {
  title: '',
  category: 'laptops',
  brand: '',
  priceRange: '',
  specs: '',
  features: '',
  images: '',
  isFeatured: false,
  displayOrder: 0,
  status: 'active'
};

const defaultTestimonialForm: TestimonialForm = {
  customerName: '',
  quote: '',
  rating: 5,
  location: '',
  isPublished: true
};

export function AdminDashboardClient() {
  const router = useRouter();
  const [tab, setTab] = useState<'leads' | 'products' | 'testimonials'>('leads');
  const [token, setToken] = useState<string>('');
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'firebase' | 'static' | null>(null);
  const [staticEmail, setStaticEmail] = useState(STATIC_ADMIN_EMAIL);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [searchLead, setSearchLead] = useState('');
  const [leadCategory, setLeadCategory] = useState<'all' | ProductCategory>('all');

  const [productForm, setProductForm] = useState<ProductForm>(defaultProductForm);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [testimonialForm, setTestimonialForm] = useState<TestimonialForm>(defaultTestimonialForm);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem(STATIC_ADMIN_TOKEN_STORAGE_KEY);
    if (savedToken === STATIC_ADMIN_TOKEN) {
      setToken(savedToken);
      setAuthMode('static');
      setStaticEmail(localStorage.getItem(STATIC_ADMIN_EMAIL_STORAGE_KEY) || STATIC_ADMIN_EMAIL);
      setAuthReady(true);
      return () => undefined;
    }

    if (!clientFirebaseReady || !clientAuth) {
      setAuthReady(true);
      router.push('/admin/login');
      return () => undefined;
    }

    const unsubscribe = onAuthStateChanged(clientAuth, async (nextUser) => {
      setAuthReady(true);
      setUser(nextUser);

      if (!nextUser) {
        router.push('/admin/login');
        return;
      }

      const idToken = await nextUser.getIdToken(true);
      setToken(idToken);
      setAuthMode('firebase');
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!token) return;

    async function fetchDashboardData() {
      setLoading(true);

      try {
        const [leadRes, productRes, testimonialRes] = await Promise.all([
          fetch('/api/admin/leads', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('/api/admin/products', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('/api/admin/testimonials', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const leadData = await leadRes.json();
        const productData = await productRes.json();
        const testimonialData = await testimonialRes.json();

        setLeads(leadData.leads || []);
        setProducts(productData.products || []);
        setTestimonials(testimonialData.testimonials || []);
      } catch {
        setStatus('Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    }

    void fetchDashboardData();
  }, [token]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const text = `${lead.name} ${lead.phone} ${lead.email || ''} ${lead.message}`.toLowerCase();
      const matchesSearch = text.includes(searchLead.toLowerCase());
      const matchesCategory = leadCategory === 'all' || lead.category === leadCategory;
      return matchesSearch && matchesCategory;
    });
  }, [leads, searchLead, leadCategory]);

  const adminStats = useMemo(
    () => ({
      leadCount: leads.length,
      productCount: products.length,
      publishedTestimonials: testimonials.filter((item) => item.isPublished).length
    }),
    [leads.length, products.length, testimonials]
  );

  function exportLeads() {
    const csv = toCsv(
      filteredLeads.map((lead) => ({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || '',
        category: lead.category,
        message: lead.message,
        preferredContact: lead.preferredContact,
        sourcePage: lead.sourcePage,
        createdAt: lead.createdAt
      }))
    );

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `foto-palace-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function withAuthFetch(url: string, options: RequestInit) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Request failed');
    }

    return response.json().catch(() => ({}));
  }

  async function handleProductSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      setStatus(null);
      const payload = {
        title: productForm.title,
        category: productForm.category,
        brand: productForm.brand,
        priceRange: productForm.priceRange,
        specs: productForm.specs.split(',').map((spec) => spec.trim()).filter(Boolean),
        features: productForm.features.split(',').map((feature) => feature.trim()).filter(Boolean),
        images: productForm.images.split(',').map((image) => image.trim()).filter(Boolean),
        isFeatured: productForm.isFeatured,
        displayOrder: Number(productForm.displayOrder),
        status: productForm.status
      };

      if (editingProductId) {
        await withAuthFetch(`/api/admin/products/${editingProductId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        await withAuthFetch('/api/admin/products', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      const refreshed = await withAuthFetch('/api/admin/products', { method: 'GET' });
      setProducts(refreshed.products || []);
      setProductForm(defaultProductForm);
      setEditingProductId(null);
      setStatus('Product saved successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Product save failed.');
    }
  }

  async function handleDeleteProduct(id?: string) {
    if (!id || !token) return;
    try {
      await withAuthFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setStatus('Product deleted.');
    } catch {
      setStatus('Failed to delete product.');
    }
  }

  async function handleTestimonialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      const payload = {
        customerName: testimonialForm.customerName,
        quote: testimonialForm.quote,
        rating: testimonialForm.rating,
        location: testimonialForm.location,
        isPublished: testimonialForm.isPublished
      };

      if (editingTestimonialId) {
        await withAuthFetch(`/api/admin/testimonials/${editingTestimonialId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        await withAuthFetch('/api/admin/testimonials', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      const refreshed = await withAuthFetch('/api/admin/testimonials', { method: 'GET' });
      setTestimonials(refreshed.testimonials || []);
      setTestimonialForm(defaultTestimonialForm);
      setEditingTestimonialId(null);
      setStatus('Testimonial saved successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to save testimonial.');
    }
  }



  async function handleDeleteTestimonial(id?: string) {
    if (!id || !token) return;

    try {
      await withAuthFetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
      setStatus('Testimonial deleted.');
    } catch {
      setStatus('Failed to delete testimonial.');
    }
  }

  if (!authReady) {
    return <p>Loading admin session...</p>;
  }

  if (!token) {
    return (
      <div className="admin-card">
        <h1>Admin Access Required</h1>
        <p>Please log in with admin credentials.</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-topbar">
        <div>
          <h1>Foto Palace Admin</h1>
          <p>{user?.email || staticEmail}</p>
        </div>
        <div className="button-row">

          <button
            className="secondary-btn"
            type="button"
            onClick={async () => {
              localStorage.removeItem(STATIC_ADMIN_TOKEN_STORAGE_KEY);
              localStorage.removeItem(STATIC_ADMIN_EMAIL_STORAGE_KEY);
              if (authMode === 'firebase' && clientAuth) {
                await signOut(clientAuth);
              }
              router.push('/admin/login');
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="tab-row">
        <button className={tab === 'leads' ? 'tab active' : 'tab'} onClick={() => setTab('leads')}>
          Leads
        </button>
        <button className={tab === 'products' ? 'tab active' : 'tab'} onClick={() => setTab('products')}>
          Products
        </button>
        <button
          className={tab === 'testimonials' ? 'tab active' : 'tab'}
          onClick={() => setTab('testimonials')}
        >
          Testimonials
        </button>
      </div>

      <div className="admin-stats">
        <article className="stat-card">
          <p>Total Leads</p>
          <h3>{adminStats.leadCount}</h3>
        </article>
        <article className="stat-card">
          <p>Products</p>
          <h3>{adminStats.productCount}</h3>
        </article>
        <article className="stat-card">
          <p>Published Testimonials</p>
          <h3>{adminStats.publishedTestimonials}</h3>
        </article>
      </div>

      <p className="form-status">
        {authMode === 'static'
          ? 'Admin mode: Static login with local persistent storage fallback enabled.'
          : 'Admin mode: Firebase authenticated session.'}
      </p>

      {loading && <p>Loading data...</p>}
      {status && <p className="form-status">{status}</p>}

      {tab === 'leads' && (
        <section className="admin-card">
          <h2>Lead Inbox</h2>
          <p className="muted-text">View, filter, and export enquiries received from website forms.</p>
          <div className="admin-toolbar">
            <input
              type="search"
              placeholder="Search name, phone, or message"
              value={searchLead}
              onChange={(event) => setSearchLead(event.target.value)}
            />
            <select
              value={leadCategory}
              onChange={(event) => setLeadCategory(event.target.value as 'all' | ProductCategory)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button className="secondary-btn" onClick={exportLeads}>
              Export CSV
            </button>
          </div>

          <div className="admin-list">
            {filteredLeads.map((lead) => (
              <article className="admin-item" key={lead.id || `${lead.phone}-${lead.createdAt}`}>
                <div className="admin-item-header">
                  <h3>{lead.name}</h3>
                  <span className="badge">{lead.category}</span>
                </div>
                <div className="admin-item-content">
                  <p className="contact-info">
                    <strong>Phone:</strong> {lead.phone} | <strong>Email:</strong> {lead.email || 'N/A'}
                  </p>
                  <p className="lead-meta">
                    Preferred contact via <strong>{lead.preferredContact}</strong>
                  </p>
                  <div className="message-box">
                    <p>{lead.message}</p>
                  </div>
                </div>
                <div className="admin-item-footer">
                  <small>Source: {lead.sourcePage}</small>
                  <small>{new Date(lead.createdAt).toLocaleString()}</small>
                </div>
              </article>
            ))}
            {filteredLeads.length === 0 && <p className="empty-state">No leads found matching your criteria.</p>}
          </div>
        </section>
      )}

      {tab === 'products' && (
        <section className="admin-card">
          <h2>{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
          <p className="muted-text">Update product cards that appear on category pages.</p>
          <form className="admin-form" onSubmit={handleProductSubmit}>
            <label>
              Title
              <input
                required
                value={productForm.title}
                onChange={(event) => setProductForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </label>
            <label>
              Category
              <select
                value={productForm.category}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, category: event.target.value as ProductCategory }))
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Brand
              <input
                required
                value={productForm.brand}
                onChange={(event) => setProductForm((prev) => ({ ...prev, brand: event.target.value }))}
              />
            </label>
            <label>
              Price Range
              <input
                required
                value={productForm.priceRange}
                onChange={(event) => setProductForm((prev) => ({ ...prev, priceRange: event.target.value }))}
              />
            </label>
            <label>
              Specs (comma separated)
              <input
                required
                value={productForm.specs}
                onChange={(event) => setProductForm((prev) => ({ ...prev, specs: event.target.value }))}
              />
            </label>
            <label>
              Features (comma separated)
              <input
                required
                value={productForm.features}
                onChange={(event) => setProductForm((prev) => ({ ...prev, features: event.target.value }))}
              />
            </label>
            <label>
              Image URLs (comma separated)
              <input
                required
                value={productForm.images}
                onChange={(event) => setProductForm((prev) => ({ ...prev, images: event.target.value }))}
              />
            </label>
            <label>
              Display Order
              <input
                type="number"
                value={productForm.displayOrder}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, displayOrder: Number(event.target.value) || 0 }))
                }
              />
            </label>
            <label>
              Status
              <select
                value={productForm.status}
                onChange={(event) =>
                  setProductForm((prev) => ({ ...prev, status: event.target.value as 'active' | 'inactive' }))
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={productForm.isFeatured}
                onChange={(event) => setProductForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
              />
              Featured Product
            </label>

            <div className="button-row">
              <button className="primary-btn" type="submit">
                {editingProductId ? 'Save Changes' : 'Add Product'}
              </button>
              {editingProductId && (
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm(defaultProductForm);
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {products.map((product) => (
              <article className="admin-item" key={product.id || product.title}>
                <div className="admin-item-header">
                  <h3>{product.title}</h3>
                  <div className="badge-row">
                    <span className="badge">{product.category}</span>
                    <span className={`status-badge ${product.status}`}>{product.status}</span>
                    {product.isFeatured && <span className="featured-badge">Featured</span>}
                  </div>
                </div>
                <div className="admin-item-content">
                  <p><strong>Brand:</strong> {product.brand} | <strong>Price:</strong> {product.priceRange}</p>
                  <p className="specs-preview">{product.specs.join(' • ')}</p>
                </div>
                <div className="admin-item-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setEditingProductId(product.id || null);
                      setProductForm({
                        title: product.title,
                        category: product.category,
                        brand: product.brand,
                        priceRange: product.priceRange,
                        specs: product.specs.join(', '),
                        features: product.features.join(', '),
                        images: product.images.join(', '),
                        isFeatured: product.isFeatured,
                        displayOrder: product.displayOrder,
                        status: product.status
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Edit Product
                  </button>
                  <button className="danger-btn" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'testimonials' && (
        <section className="admin-card">
          <h2>{editingTestimonialId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <p className="muted-text">Manage customer quotes shown on the home page.</p>
          <form className="admin-form" onSubmit={handleTestimonialSubmit}>
            <label>
              Customer Name
              <input
                required
                value={testimonialForm.customerName}
                onChange={(event) =>
                  setTestimonialForm((prev) => ({ ...prev, customerName: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Quote
              <textarea
                rows={3}
                required
                value={testimonialForm.quote}
                onChange={(event) => setTestimonialForm((prev) => ({ ...prev, quote: event.target.value }))}
              />
            </label>
            <label>
              Rating
              <input
                type="number"
                min={1}
                max={5}
                value={testimonialForm.rating}
                onChange={(event) =>
                  setTestimonialForm((prev) => ({ ...prev, rating: Number(event.target.value) || 5 }))
                }
              />
            </label>
            <label>
              Location
              <input
                value={testimonialForm.location}
                onChange={(event) => setTestimonialForm((prev) => ({ ...prev, location: event.target.value }))}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={testimonialForm.isPublished}
                onChange={(event) =>
                  setTestimonialForm((prev) => ({ ...prev, isPublished: event.target.checked }))
                }
              />
              Publish on website
            </label>

            <div className="button-row">
              <button className="primary-btn" type="submit">
                {editingTestimonialId ? 'Save Changes' : 'Add Testimonial'}
              </button>
              {editingTestimonialId && (
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={() => {
                    setEditingTestimonialId(null);
                    setTestimonialForm(defaultTestimonialForm);
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {testimonials.map((item) => (
              <article className="admin-item" key={item.id || `${item.customerName}-${item.createdAt}`}>
                <div className="admin-item-header">
                  <h3>{item.customerName}</h3>
                  <div className="badge-row">
                    <span className="badge">{item.location || 'Vengavasal'}</span>
                    <span className={`status-badge ${item.isPublished ? 'published' : 'hidden'}`}>
                      {item.isPublished ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="admin-item-content">
                  <div className="message-box quote">
                    <p>"{item.quote}"</p>
                  </div>
                </div>
                <div className="admin-item-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setEditingTestimonialId(item.id || null);
                      setTestimonialForm({
                        customerName: item.customerName,
                        quote: item.quote,
                        rating: item.rating || 5,
                        location: item.location || '',
                        isPublished: item.isPublished
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Edit Testimonial
                  </button>
                  <button className="danger-btn" onClick={() => handleDeleteTestimonial(item.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
