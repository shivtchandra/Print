import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Admin Dashboard',
  description: 'Manage leads, products, and testimonials for Foto Palace.',
  canonical: '/admin/dashboard'
});

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
