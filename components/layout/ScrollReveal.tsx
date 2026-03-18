'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      '.fade-up, .section-head, .category-card, .product-card, .testimonial-card, .reveal-on-scroll'
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [pathname]);

  return null;
}

