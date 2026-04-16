'use client';

import { FormEvent, useState } from 'react';

import { trackGenerateLead } from '@/lib/analytics/events';
import { ProductCategory } from '@/lib/types/entities';

const categories: ProductCategory[] = [
  'laptops',
  'gaming-desktops',
  'printers',
  'cctv',
  'assembled-desktops',
  'accessories'
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: 'laptops' as ProductCategory,
    preferredContact: 'phone' as 'phone' | 'whatsapp' | 'email'
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          sourcePage: '/contact'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus(data.error || 'Invalid information. Please check your inputs.');
        return;
      }

      trackGenerateLead({ category: form.category, source_page: '/contact' });

      setStatus('Thanks for contacting Foto Palace. Our team will reach out soon.');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        category: 'laptops',
        preferredContact: 'phone'
      });
    } catch {
      setStatus('Failed to send message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
      </label>
      <label>
        Phone
        <input
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
        />
      </label>
      <label>
        Product Interest
        <select
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as ProductCategory }))}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Preferred Contact
        <select
          value={form.preferredContact}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              preferredContact: event.target.value as 'phone' | 'whatsapp' | 'email'
            }))
          }
        >
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>
      </label>
      <label className="full-width">
        Message
        <textarea
          rows={4}
          minLength={10}
          required
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        />
      </label>
      <button className="primary-btn" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}
