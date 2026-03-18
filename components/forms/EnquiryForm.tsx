'use client';

import { FormEvent, useMemo, useState } from 'react';

import { ProductCategory } from '@/lib/types/entities';

interface EnquiryFormProps {
  category: ProductCategory;
  sourcePage: string;
  title?: string;
}

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
  preferredContact: 'phone'
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function EnquiryForm({ category, sourcePage, title = 'Get a Quote' }: EnquiryFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => form.name.trim() && form.phone.trim() && form.message.trim().length >= 10,
    [form]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

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
          category,
          sourcePage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || 'Invalid information. Please check your inputs.');
        return;
      }

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          category,
          sourcePage
        });
      }

      setStatus('Thank you. We will contact you shortly.');
      setForm(initialState);
    } catch {
      setStatus('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="enquiry" className="section">
      <div className="container">
        <div className="enquiry-card">
          <h2>{title}</h2>
          <p>Share your requirement and get a callback from Foto Palace.</p>

          <form onSubmit={handleSubmit} className="enquiry-form">
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </label>
            <label>
              Phone
              <input
                required
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                placeholder="Phone number"
              />
            </label>
            <label>
              Email (optional)
              <input
                value={form.email}
                type="email"
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              />
            </label>
            <label>
              Preferred Contact
              <select
                value={form.preferredContact}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    preferredContact: event.target.value as FormState['preferredContact']
                  }))
                }
              >
                <option value="phone">Phone Call</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </label>
            <label className="full-width">
              Message
              <textarea
                required
                rows={4}
                minLength={10}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell us your use case, budget, and preferred brand"
              />
            </label>
            <button disabled={loading || !canSubmit} type="submit" className="primary-btn">
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
