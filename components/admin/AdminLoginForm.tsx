'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import {
  STATIC_ADMIN_EMAIL,
  STATIC_ADMIN_PASSWORD,
  STATIC_ADMIN_EMAIL_STORAGE_KEY,
  STATIC_ADMIN_TOKEN,
  STATIC_ADMIN_TOKEN_STORAGE_KEY,
  isStaticAdminCredentials
} from '@/lib/admin/static-admin';
import { clientAuth, clientFirebaseReady } from '@/lib/firebase/client';

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (isStaticAdminCredentials(email, password)) {
        localStorage.setItem(STATIC_ADMIN_TOKEN_STORAGE_KEY, STATIC_ADMIN_TOKEN);
        localStorage.setItem(STATIC_ADMIN_EMAIL_STORAGE_KEY, STATIC_ADMIN_EMAIL);
        router.push('/admin/dashboard');
        return;
      }

      if (!clientAuth) {
        setError('Invalid admin credentials.');
        return;
      }

      await signInWithEmailAndPassword(clientAuth, email, password);
      localStorage.removeItem(STATIC_ADMIN_TOKEN_STORAGE_KEY);
      localStorage.removeItem(STATIC_ADMIN_EMAIL_STORAGE_KEY);
      router.push('/admin/dashboard');
    } catch {
      setError('Login failed. Please verify admin email and password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-card">
      <h1>Admin Login</h1>
      <p>Sign in to manage leads, products, and testimonials.</p>
      {!clientFirebaseReady && (
        <p className="form-status">Firebase login unavailable; static admin credentials are enabled.</p>
      )}
      <p className="form-status">Static login: {STATIC_ADMIN_EMAIL} / {STATIC_ADMIN_PASSWORD}</p>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Email
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <p className="form-status error">{error}</p>}
      </form>
    </div>
  );
}
