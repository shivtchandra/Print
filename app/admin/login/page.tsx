import { pageMetadata } from '@/lib/seo/metadata';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const metadata = pageMetadata({
  title: 'Admin Login',
  description: 'Secure login for Foto Palace admin panel.',
  canonical: '/admin/login'
});

export default function AdminLoginPage() {
  return (
    <div className="admin-layout">
      <AdminLoginForm />
    </div>
  );
}
