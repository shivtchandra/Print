import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ConfigProvider } from '@/components/providers/ConfigProvider';
import { getStorefrontConfig } from '@/lib/data/storefront';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const config = await getStorefrontConfig();

  return (
    <ConfigProvider config={config}>
      <Header />
      <main>{children}</main>
      <Footer />
    </ConfigProvider>
  );
}
