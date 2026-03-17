'use client';

import { AnchorHTMLAttributes } from 'react';

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventParams?: Record<string, string | number>;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackedAnchor({ eventName, eventParams, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', eventName, eventParams || {});
        }
        onClick?.(event);
      }}
    />
  );
}
