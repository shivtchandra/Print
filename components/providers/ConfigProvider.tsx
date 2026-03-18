'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { BusinessInfo, HeroSlide } from '@/lib/types/entities';

interface ConfigContextType {
  businessInfo: BusinessInfo;
  heroSlides: HeroSlide[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ 
  children, 
  config 
}: { 
  children: React.ReactNode; 
  config: ConfigContextType 
}) {
  const value = useMemo(() => config, [config]);

  return (
    <ConfigContext.Provider value={value}>
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
