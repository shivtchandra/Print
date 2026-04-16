import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';
import { ConfigProvider } from '@/components/providers/ConfigProvider';
import { getStorefrontConfig } from '@/lib/data/storefront';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const config = await getStorefrontConfig();

  return (
    <ConfigProvider config={config}>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsApp />
    </ConfigProvider>
  );
}
