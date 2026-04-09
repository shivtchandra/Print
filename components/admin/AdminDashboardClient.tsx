'use client';

import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import {
  STATIC_ADMIN_EMAIL,
  STATIC_ADMIN_EMAIL_STORAGE_KEY,
  STATIC_ADMIN_TOKEN,
  STATIC_ADMIN_TOKEN_STORAGE_KEY
} from '@/lib/admin/static-admin';
import { clientAuth, clientFirebaseReady } from '@/lib/firebase/client';
import { toCsv } from '@/lib/utils/format';
import { ImageUpload } from '../media/ImageUpload';
import { Lead, Product, ProductCategory, SiteConfig, Testimonial } from '@/lib/types/entities';

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
  description: string;
  isFeatured: boolean;
  displayOrder: number;
  status: 'active' | 'inactive';
  customizations: { name: string; options: { label: string; price: number }[] }[];
};

type TestimonialForm = {
  customerName: string;
  quote: string;
  rating: number;
  location: string;
  isPublished: boolean;
};

type ConfigForm = SiteConfig;

const defaultProductForm: ProductForm = {
  title: '',
  category: 'laptops',
  brand: '',
  priceRange: '',
  specs: '',
  features: '',
  images: '',
  description: '',
  isFeatured: false,
  displayOrder: 0,
  status: 'active',
  customizations: []
};

const defaultTestimonialForm: TestimonialForm = {
  customerName: '',
  quote: '',
  rating: 5,
  location: '',
  isPublished: true
};

const defaultConfigForm: ConfigForm = {
  businessInfo: {
    name: '',
    tagline: '',
    description: '',
    phones: [],
    whatsapp: '',
    email: '',
    address: '',
    hours: '',
    copyright: '',
    googleMapEmbed: '',
    adBannerText: ''
  },
  heroSlides: [],
  aboutPage: {
    heroTitle: 'About Foto Palace',
    introParagraphs: [
      'Foto Palace is your trusted local tech partner in Vengavasal. We are known for reliable product recommendations, honest pricing, and quick support.',
      'From laptops and gaming desktops to printers, CCTV systems, custom assembled desktops, and IT accessories, we help individuals and businesses choose the right technology with confidence.',
      'We do PC customization end-to-end, and we are the best at tailoring builds to your requirements. Choose the right options and you will always get the best price for your setup.'
    ],
    whyTitle: 'Why Customers Choose Us',
    whyBullets: [
      'PC and laptop customization built around your requirements',
      'Local after-sales and setup support',
      'We find the right parts so you get the best price',
      'Bulk pricing for offices and institutions'
    ]
  },
  laptopCustomization: {
    categories: []
  },
  mobileHeroProductIds: []
};

export function AdminDashboardClient() {
  const router = useRouter();
  const [tab, setTab] = useState<'leads' | 'products' | 'testimonials' | 'settings'>('leads');
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

  const [configForm, setConfigForm] = useState<ConfigForm>(defaultConfigForm);

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


  const withAuthFetch = useCallback(
    async (url: string, options: RequestInit) => {
      let bearer = token;
      if (user) {
        bearer = await user.getIdToken();
      }

      let response: Response;
      try {
        response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
            ...(options.headers || {})
          }
        });
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Network request failed');
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
        };
        const message = [data.error, data.details].filter(Boolean).join(': ') || 'Request failed';
        throw new Error(message);
      }

      return response.json().catch(() => ({}));
    },
    [token, user]
  );

  useEffect(() => {
    if (!token) return;

    async function fetchDashboardData() {
      setLoading(true);

      try {
        const [leadRes, productRes, testimonialRes, configRes] = await Promise.all([
          withAuthFetch('/api/admin/leads', { method: 'GET' }),
          withAuthFetch('/api/admin/products', { method: 'GET' }),
          withAuthFetch('/api/admin/testimonials', { method: 'GET' }),
          withAuthFetch('/api/admin/config', { method: 'GET' })
        ]);

        setLeads(leadRes.leads || []);
        setProducts(productRes.products || []);
        setTestimonials(testimonialRes.testimonials || []);
        if (configRes.config) {
          setConfigForm({
            ...defaultConfigForm,
            ...configRes.config,
            businessInfo: { ...defaultConfigForm.businessInfo, ...(configRes.config.businessInfo || {}) },
            aboutPage: { ...defaultConfigForm.aboutPage, ...(configRes.config.aboutPage || {}) },
            laptopCustomization: {
              ...defaultConfigForm.laptopCustomization,
              ...(configRes.config.laptopCustomization || {}),
              categories: configRes.config.laptopCustomization?.categories || defaultConfigForm.laptopCustomization.categories
            },
            mobileHeroProductIds: configRes.config.mobileHeroProductIds || []
          });
        }
      } catch (err) {
        setStatus(err instanceof Error ? err.message : 'Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    }

    void fetchDashboardData();
  }, [token, withAuthFetch]);

  // filteredLeads calculation...
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const text = `${lead.name || ''} ${lead.phone || ''} ${lead.email || ''} ${lead.message || ''}`.toLowerCase();
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

  async function handleProductSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    try {
      setStatus(null);
      const displayOrderRaw = Number(productForm.displayOrder);
      const displayOrder = Number.isFinite(displayOrderRaw) ? displayOrderRaw : 0;
      const payload = {
        title: productForm.title.trim(),
        category: productForm.category,
        brand: productForm.brand.trim(),
        priceRange: productForm.priceRange.trim(),
        specs: productForm.specs.split(',').map((spec) => spec.trim()).filter(Boolean),
        features: productForm.features.split(',').map((feature) => feature.trim()).filter(Boolean),
        images: productForm.images.split(',').map((image) => image.trim()).filter(Boolean),
        description: productForm.description.trim(),
        isFeatured: productForm.isFeatured,
        displayOrder,
        status: productForm.status,
        customizations: productForm.customizations
          .filter((c) => c.name.trim() && c.options.some((o) => o.label.trim()))
          .map((c) => ({
            name: c.name.trim(),
            options: c.options
              .filter((o) => o.label.trim())
              .map((o) => {
                const p = Number(o.price);
                return { label: o.label.trim(), price: Number.isFinite(p) && p >= 0 ? p : 0 };
              })
          }))
          .filter((c) => c.options.length > 0)
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

  async function handleConfigSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    setLoading(true);
    setStatus(null);

    try {
      await withAuthFetch('/api/admin/config', {
        method: 'PUT',
        body: JSON.stringify(configForm)
      });
      setStatus('Site configuration updated successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to save configuration.');
    } finally {
      setLoading(false);
    }
  }


  const renderProductForm = () => (
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
        Product Description
        <textarea
          value={productForm.description}
          onChange={(event) => setProductForm((prev) => ({ ...prev, description: event.target.value }))}
          rows={4}
          placeholder="Detailed description of the product..."
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
      <label className="full-width">
        Product Images
        <ImageUpload
          folder="products"
          allowMultiple={true}
          maxFiles={10}
          initialUrls={productForm.images.split(',').map(u => u.trim()).filter(Boolean)}
          onUploadComplete={(urls) => setProductForm(prev => ({ ...prev, images: urls.join(',') }))}
        />
        <p className="muted-text mt-2" style={{ fontSize: '0.8rem' }}>
          Upload product photos. The first image will be used as the main thumbnail. 
          You can also manually edit the URLs below if needed.
        </p>
        <input
          value={productForm.images}
          onChange={(event) => setProductForm((prev) => ({ ...prev, images: event.target.value }))}
          placeholder="Comma separated URLs..."
          style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
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

      <div className="form-section mt-10">
        <div className="flex-between">
          <h3>Customization Options</h3>
          <button
            type="button"
            className="secondary-btn sm"
            onClick={() =>
              setProductForm((prev) => ({
                ...prev,
                customizations: [...prev.customizations, { name: '', options: [{ label: '', price: 0 }] }]
              }))
            }
          >
            + Add Category
          </button>
        </div>
        <p className="muted-text" style={{ marginTop: '0.5rem' }}>
          Add upgrade categories like RAM, Processor, Storage. Customers can pick options and get a quote.
        </p>

        <div className="slides-container">
          {productForm.customizations.map((cat, catIdx) => (
            <article key={catIdx} className="admin-sub-card">
              <div className="flex-between">
                <h4>Category {catIdx + 1}</h4>
                <button
                  type="button"
                  className="danger-btn sm"
                  onClick={() => {
                    const next = [...productForm.customizations];
                    next.splice(catIdx, 1);
                    setProductForm((prev) => ({ ...prev, customizations: next }));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="form-grid-inner">
                <label className="full-width">
                  Category Name (e.g. RAM, Processor)
                  <input
                    value={cat.name}
                    onChange={(e) => {
                      const next = [...productForm.customizations];
                      next[catIdx] = { ...next[catIdx], name: e.target.value };
                      setProductForm((prev) => ({ ...prev, customizations: next }));
                    }}
                  />
                </label>
              </div>

              <div className="form-section" style={{ marginTop: '0.75rem' }}>
                <div className="flex-between">
                  <h4 style={{ fontSize: '0.95rem' }}>Options</h4>
                  <button
                    type="button"
                    className="secondary-btn sm"
                    onClick={() => {
                      const next = [...productForm.customizations];
                      next[catIdx] = {
                        ...next[catIdx],
                        options: [...next[catIdx].options, { label: '', price: 0 }]
                      };
                      setProductForm((prev) => ({ ...prev, customizations: next }));
                    }}
                  >
                    + Add Option
                  </button>
                </div>
                <div className="slides-container">
                  {cat.options.map((opt, optIdx) => (
                    <div key={optIdx} className="admin-sub-card" style={{ padding: '0.75rem' }}>
                      <div className="flex-between">
                        <small>Option {optIdx + 1}</small>
                        <button
                          type="button"
                          className="danger-btn sm"
                          onClick={() => {
                            const next = [...productForm.customizations];
                            const opts = [...next[catIdx].options];
                            opts.splice(optIdx, 1);
                            next[catIdx] = { ...next[catIdx], options: opts.length ? opts : [{ label: '', price: 0 }] };
                            setProductForm((prev) => ({ ...prev, customizations: next }));
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <div className="form-grid-inner">
                        <label>
                          Label
                          <input
                            value={opt.label}
                            onChange={(e) => {
                              const next = [...productForm.customizations];
                              const opts = [...next[catIdx].options];
                              opts[optIdx] = { ...opts[optIdx], label: e.target.value };
                              next[catIdx] = { ...next[catIdx], options: opts };
                              setProductForm((prev) => ({ ...prev, customizations: next }));
                            }}
                          />
                        </label>
                        <label>
                          Price (+₹)
                          <input
                            type="number"
                            min={0}
                            value={opt.price}
                            onChange={(e) => {
                              const next = [...productForm.customizations];
                              const opts = [...next[catIdx].options];
                              opts[optIdx] = { ...opts[optIdx], price: Number(e.target.value) || 0 };
                              next[catIdx] = { ...next[catIdx], options: opts };
                              setProductForm((prev) => ({ ...prev, customizations: next }));
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
          {productForm.customizations.length === 0 && (
            <p className="muted-text">
              No customization categories. Click &quot;+ Add Category&quot; to add upgrade options like RAM,
              Processor, etc.
            </p>
          )}
        </div>
      </div>

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
  );

  const renderTestimonialForm = () => (
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
  );

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
        <button
          className={tab === 'settings' ? 'tab active' : 'tab'}
          onClick={() => setTab('settings')}
        >
          Settings
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
          {!editingProductId && (
            <>
              <h2>Add Product</h2>
              <p className="muted-text">Update product cards that appear on category pages.</p>
              {renderProductForm()}
            </>
          )}

          <div className="admin-list" style={{ marginTop: editingProductId ? '0' : '2.5rem' }}>
            {products.map((product) => (
              <div key={product.id || product.title}>
                <article className={editingProductId === product.id ? "admin-item editing" : "admin-item"}>
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
                          description: product.description || '',
                          isFeatured: product.isFeatured,
                          displayOrder: product.displayOrder,
                          status: product.status,
                          customizations: (product.customizations || []).map((c) => ({
                            name: c.name,
                            options: c.options.map((o) => {
                              const p = Number(o.price);
                              return {
                                label: o.label,
                                price: Number.isFinite(p) && p >= 0 ? p : 0
                              };
                            })
                          }))
                        });
                      }}
                    >
                      {editingProductId === product.id ? 'Currently Editing...' : 'Edit Product'}
                    </button>
                    <button className="danger-btn" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </article>

                {editingProductId === product.id && (
                  <div className="inline-edit-form-wrap">
                    <div className="flex-between mb-4">
                      <h2 style={{ margin: 0 }}>Editing: {product.title}</h2>
                      <button 
                        className="secondary-btn sm" 
                        onClick={() => {
                          setEditingProductId(null);
                          setProductForm(defaultProductForm);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    {renderProductForm()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'testimonials' && (
        <section className="admin-card">
          {!editingTestimonialId && (
            <>
              <h2>Add Testimonial</h2>
              <p className="muted-text">Manage customer quotes shown on the home page.</p>
              {renderTestimonialForm()}
            </>
          )}

          <div className="admin-list" style={{ marginTop: editingTestimonialId ? '0' : '2.5rem' }}>
            {testimonials.map((item) => (
              <div key={item.id || `${item.customerName}-${item.createdAt}`}>
                <article className={editingTestimonialId === item.id ? "admin-item editing" : "admin-item"}>
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
                      <p>&quot;{item.quote}&quot;</p>
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
                      }}
                    >
                      {editingTestimonialId === item.id ? 'Currently Editing...' : 'Edit Testimonial'}
                    </button>
                    <button className="danger-btn" onClick={() => handleDeleteTestimonial(item.id)}>
                      Delete
                    </button>
                  </div>
                </article>

                {editingTestimonialId === item.id && (
                  <div className="inline-edit-form-wrap">
                    <div className="flex-between mb-4">
                      <h2 style={{ margin: 0 }}>Editing: {item.customerName}</h2>
                      <button 
                        className="secondary-btn sm" 
                        onClick={() => {
                          setEditingTestimonialId(null);
                          setTestimonialForm(defaultTestimonialForm);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    {renderTestimonialForm()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'settings' && (
        <section className="admin-card">
          <h2>Site Settings</h2>
          <p className="muted-text">Update business details and homepage carousel content.</p>

          <form className="admin-form settings-form" onSubmit={handleConfigSubmit}>
            <div className="full-width">
              <div className="form-section">
                <h3>Business Information</h3>
                <div className="form-grid-inner">
                  <label>
                    Company Name
                    <input
                      required
                      value={configForm.businessInfo.name}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, name: e.target.value }
                        }))
                      }
                    />
                  </label>
                  <label>
                    WhatsApp Number
                    <input
                      required
                      value={configForm.businessInfo.whatsapp}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, whatsapp: e.target.value }
                        }))
                      }
                    />
                  </label>
                  <label>
                    Phones (comma separated)
                    <input
                      required
                      value={configForm.businessInfo.phones.join(', ')}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: {
                            ...prev.businessInfo,
                            phones: e.target.value.split(',').map((p) => p.trim())
                          }
                        }))
                      }
                    />
                  </label>
                  <label>
                    Email
                    <input
                      required
                      type="email"
                      value={configForm.businessInfo.email}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, email: e.target.value }
                        }))
                      }
                    />
                  </label>
                  <label className="full-width">
                    Address
                    <input
                      required
                      value={configForm.businessInfo.address}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, address: e.target.value }
                        }))
                      }
                    />
                  </label>
                  <label className="full-width">
                    Google Maps Embed URL
                    <input
                      required
                      value={configForm.businessInfo.googleMapEmbed}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, googleMapEmbed: e.target.value }
                        }))
                      }
                    />
                  </label>
                  <label className="full-width">
                    Ad Banner Text (Header Announcement)
                    <input
                      value={configForm.businessInfo.adBannerText || ''}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, adBannerText: e.target.value }
                        }))
                      }
                      placeholder="e.g. Free delivery on orders above ₹5,000"
                    />
                  </label>
                </div>
              </div>

              <div className="form-section mt-10">
                <div className="flex-between">
                  <h3>Hero Carousel Slides</h3>
                  <button
                    type="button"
                    className="secondary-btn sm"
                    onClick={() =>
                      setConfigForm((prev) => ({
                        ...prev,
                        heroSlides: [...prev.heroSlides, { title: '', subtitle: '', image: '' }]
                      }))
                    }
                  >
                    + Add Slide
                  </button>
                </div>
                <div className="slides-container">
                  {configForm.heroSlides.map((slide, index) => (
                    <article key={index} className="admin-sub-card">
                      <div className="flex-between">
                        <h4>Slide {index + 1}</h4>
                        <button
                          type="button"
                          className="danger-btn sm"
                          onClick={() => {
                            const next = [...configForm.heroSlides];
                            next.splice(index, 1);
                            setConfigForm((prev) => ({ ...prev, heroSlides: next }));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="form-grid-inner">
                        <label>
                          Title
                          <input
                            required
                            value={slide.title}
                            onChange={(e) => {
                              const next = [...configForm.heroSlides];
                              next[index] = { ...next[index], title: e.target.value };
                              setConfigForm((prev) => ({ ...prev, heroSlides: next }));
                            }}
                          />
                        </label>
                        <label>
                          Subtitle
                          <input
                            required
                            value={slide.subtitle}
                            onChange={(e) => {
                              const next = [...configForm.heroSlides];
                              next[index] = { ...next[index], subtitle: e.target.value };
                              setConfigForm((prev) => ({ ...prev, heroSlides: next }));
                            }}
                          />
                        </label>
                        <label className="full-width">
                          Slide Image
                          <ImageUpload
                            folder="heroes"
                            allowMultiple={false}
                            initialUrls={slide.image ? [slide.image] : []}
                            onUploadComplete={(urls) => {
                              const next = [...configForm.heroSlides];
                              next[index] = { ...next[index], image: urls[0] || '' };
                              setConfigForm((prev) => ({ ...prev, heroSlides: next }));
                            }}
                          />
                          <input
                            required
                            type="url"
                            value={slide.image}
                            onChange={(e) => {
                              const next = [...configForm.heroSlides];
                              next[index] = { ...next[index], image: e.target.value };
                              setConfigForm((prev) => ({ ...prev, heroSlides: next }));
                            }}
                            placeholder="Or paste image URL here..."
                            style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                          />
                        </label>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="form-section mt-10">
                <h3>Mobile Hero Products</h3>
                <p className="muted-text" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                  Select which products appear in the mobile hero carousel. On mobile, product cards replace the image slides.
                </p>
                <div className="admin-list">
                  {products.filter(p => p.status === 'active').map((product) => {
                    const isSelected = (configForm.mobileHeroProductIds || []).includes(product.id || '');
                    return (
                      <label
                        key={product.id}
                        className="admin-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          cursor: 'pointer',
                          padding: '1rem',
                          background: isSelected ? 'rgba(255, 126, 51, 0.08)' : undefined,
                          borderColor: isSelected ? 'var(--primary)' : undefined
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setConfigForm((prev) => {
                              const ids = prev.mobileHeroProductIds || [];
                              const next = isSelected
                                ? ids.filter((id) => id !== product.id)
                                : [...ids, product.id!];
                              return { ...prev, mobileHeroProductIds: next };
                            });
                          }}
                          style={{ width: 20, height: 20, accentColor: 'var(--primary)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <strong>{product.title}</strong>
                          <br />
                          <small style={{ color: 'var(--muted)' }}>
                            {product.brand} · {product.priceRange}
                          </small>
                        </div>
                        {isSelected && (
                          <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>SELECTED</span>
                        )}
                      </label>
                    );
                  })}
                  {products.filter(p => p.status === 'active').length === 0 && (
                    <p className="muted-text">No active products. Add products in the Products tab first.</p>
                  )}
                </div>
              </div>

              <div className="form-section mt-10">
                <h3>About Page Content</h3>
                <div className="form-grid-inner">
                  <label>
                    Hero Title
                    <input
                      required
                      value={configForm.aboutPage.heroTitle}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          aboutPage: { ...prev.aboutPage, heroTitle: e.target.value }
                        }))
                      }
                    />
                  </label>

                  <label>
                    Why Title
                    <input
                      required
                      value={configForm.aboutPage.whyTitle}
                      onChange={(e) =>
                        setConfigForm((prev) => ({
                          ...prev,
                          aboutPage: { ...prev.aboutPage, whyTitle: e.target.value }
                        }))
                      }
                    />
                  </label>

                  <label className="full-width">
                    Intro Paragraphs (separate by blank line)
                    <textarea
                      required
                      rows={4}
                      value={configForm.aboutPage.introParagraphs.join('\n\n')}
                      onChange={(e) => {
                        const paragraphs = e.target.value
                          .split(/\n{2,}/g)
                          .map((p) => p.trim())
                          .filter(Boolean);
                        setConfigForm((prev) => ({
                          ...prev,
                          aboutPage: { ...prev.aboutPage, introParagraphs: paragraphs.length ? paragraphs : prev.aboutPage.introParagraphs }
                        }));
                      }}
                    />
                  </label>

                  <label className="full-width">
                    Why Bullets (one per line)
                    <textarea
                      required
                      rows={3}
                      value={configForm.aboutPage.whyBullets.join('\n')}
                      onChange={(e) => {
                        const bullets = e.target.value
                          .split('\n')
                          .map((b) => b.trim())
                          .filter(Boolean);
                        setConfigForm((prev) => ({
                          ...prev,
                          aboutPage: { ...prev.aboutPage, whyBullets: bullets.length ? bullets : prev.aboutPage.whyBullets }
                        }));
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="form-section mt-10">
                <div className="flex-between">
                  <h3>Laptop Customization (Estimates)</h3>
                  <button
                    type="button"
                    className="secondary-btn sm"
                    onClick={() => {
                      setConfigForm((prev) => ({
                        ...prev,
                        laptopCustomization: {
                          ...prev.laptopCustomization,
                          categories: [
                            ...prev.laptopCustomization.categories,
                            { name: '', options: [{ label: '', price: 0 }] }
                          ]
                        }
                      }));
                    }}
                  >
                    + Add Category
                  </button>
                </div>

                <p className="muted-text" style={{ marginTop: '0.75rem' }}>
                  These options will show on every laptop product page. Customers can select one option per category and see an estimated total.
                </p>

                <div className="slides-container">
                  {configForm.laptopCustomization.categories.map((category, catIndex) => (
                    <article key={category.id || `${category.name}-${catIndex}`} className="admin-sub-card">
                      <div className="flex-between">
                        <h4>Category {catIndex + 1}</h4>
                        <button
                          type="button"
                          className="danger-btn sm"
                          onClick={() => {
                            const next = [...configForm.laptopCustomization.categories];
                            next.splice(catIndex, 1);
                            setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: next } }));
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="form-grid-inner">
                        <label className="full-width">
                          Category Name
                          <input
                            required
                            value={category.name}
                            onChange={(e) => {
                              const nextCats = [...configForm.laptopCustomization.categories];
                              nextCats[catIndex] = { ...nextCats[catIndex], name: e.target.value };
                              setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: nextCats } }));
                            }}
                          />
                        </label>
                      </div>

                      <div className="form-section mt-10">
                        <div className="flex-between">
                          <h3 style={{ fontSize: '1.1rem' }}>Options</h3>
                          <button
                            type="button"
                            className="secondary-btn sm"
                            onClick={() => {
                              const nextCats = [...configForm.laptopCustomization.categories];
                              nextCats[catIndex] = {
                                ...nextCats[catIndex],
                                options: [...nextCats[catIndex].options, { label: '', price: 0 }]
                              };
                              setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: nextCats } }));
                            }}
                          >
                            + Add Option
                          </button>
                        </div>

                        <div className="slides-container">
                          {category.options.map((option, optIndex) => (
                            <article key={option.id || `${option.label}-${optIndex}`} className="admin-sub-card">
                              <div className="flex-between">
                                <h4>Option {optIndex + 1}</h4>
                                <button
                                  type="button"
                                  className="danger-btn sm"
                                  onClick={() => {
                                    const nextCats = [...configForm.laptopCustomization.categories];
                                    const nextOpts = [...nextCats[catIndex].options];
                                    nextOpts.splice(optIndex, 1);
                                    nextCats[catIndex] = { ...nextCats[catIndex], options: nextOpts.length ? nextOpts : [{ label: '', price: 0 }] };
                                    setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: nextCats } }));
                                  }}
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="form-grid-inner">
                                <label>
                                  Option Label
                                  <input
                                    required
                                    value={option.label}
                                    onChange={(e) => {
                                      const nextCats = [...configForm.laptopCustomization.categories];
                                      const nextOpts = [...nextCats[catIndex].options];
                                      nextOpts[optIndex] = { ...nextOpts[optIndex], label: e.target.value };
                                      nextCats[catIndex] = { ...nextCats[catIndex], options: nextOpts };
                                      setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: nextCats } }));
                                    }}
                                  />
                                </label>

                                <label>
                                  Price (+)
                                  <input
                                    required
                                    type="number"
                                    min={0}
                                    value={option.price}
                                    onChange={(e) => {
                                      const nextCats = [...configForm.laptopCustomization.categories];
                                      const nextOpts = [...nextCats[catIndex].options];
                                      nextOpts[optIndex] = { ...nextOpts[optIndex], price: Number(e.target.value) || 0 };
                                      nextCats[catIndex] = { ...nextCats[catIndex], options: nextOpts };
                                      setConfigForm((prev) => ({ ...prev, laptopCustomization: { ...prev.laptopCustomization, categories: nextCats } }));
                                    }}
                                  />
                                </label>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                  {configForm.laptopCustomization.categories.length === 0 && (
                    <p className="muted-text">
                      No customization categories yet. Add RAM / Storage / GPU upgrade options to enable estimates on laptop pages.
                    </p>
                  )}
                </div>
              </div>

              <div className="button-row mt-10">
                <button className="primary-btn" type="submit" disabled={loading}>
                  {loading ? 'Saving Settings...' : 'Save Site Settings'}
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
