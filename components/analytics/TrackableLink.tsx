'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface TrackableLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number>;
  target?: string;
  rel?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackableLink({
  children,
  className,
  eventName,
  eventParams,
  ...props
}: TrackableLinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams || {});
    }
  };

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
