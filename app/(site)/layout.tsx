import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';
import { ConfigProvider } from '@/components/providers/ConfigProvider';
import { CartProvider } from '@/components/providers/CartContext';
import { getStorefrontConfig } from '@/lib/data/storefront';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const config = await getStorefrontConfig();

  return (
    <ConfigProvider config={config}>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <MobileBottomNav />
        <FloatingWhatsApp />
      </CartProvider>
    </ConfigProvider>
  );
}
