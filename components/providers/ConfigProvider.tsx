'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { AboutPageContent, BusinessInfo, HeroSlide, ProductCategory, CategoryMeta } from '@/lib/types/entities';

interface ConfigContextType {
  businessInfo: BusinessInfo;
  heroSlides: HeroSlide[];
  categorySettings?: Partial<Record<ProductCategory, Partial<CategoryMeta>>>;
  aboutPage: AboutPageContent;
  mobileHeroProductIds: string[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ 
  children, 
  config 
}: { 
  children: React.ReactNode; 
  config: ConfigContextType 
}) {
  const [value, setValue] = React.useState<ConfigContextType>(config);

  React.useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function syncConfig() {
      try {
        const res = await fetch('/api/config', {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store'
        });
        if (!res.ok) return;
        const data = (await res.json()) as ConfigContextType;
        if (!mounted) return;
        setValue(data);
      } catch {
        // Ignore polling errors; keep last-known config.
      }
    }

    // Fetch immediately and then keep it updated.
    void syncConfig();
    const interval = window.setInterval(() => void syncConfig(), 10000);

    return () => {
      mounted = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  const memoValue = useMemo(() => value, [value]);

  return (
    <ConfigContext.Provider value={memoValue}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
