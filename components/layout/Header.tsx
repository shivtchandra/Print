'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';
import { socialLinks } from '@/lib/config';
import { categoryMeta } from '@/lib/data/catalog';

type NavItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'products'; label: string };

const navItems: NavItem[] = [
  { type: 'link', href: '/', label: 'Home' },
  { type: 'products', label: 'Products' },
  { type: 'link', href: '/blogs', label: 'Blogs' },
  { type: 'link', href: '/about', label: 'About' },
  { type: 'link', href: '/contact', label: 'Contact' }
];

const productCategories = Object.keys(categoryMeta) as (keyof typeof categoryMeta)[];

function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={`header-social-icons ${className || ''}`}>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="header-social-link"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </a>
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="header-social-link"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      </a>
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="header-social-link"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    </div>
  );
}

export function Header() {
  const { businessInfo } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className="announcement-bar">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="marquee-item">
              {businessInfo.adBannerText || 'Free delivery above ₹5,000 on eligible orders'}
            </span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">EMI available on select laptops & desktops</span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">Exchange offers on laptops — ask in store</span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">Call {businessInfo.phones[0]} for instant quotes</span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">
              {businessInfo.adBannerText || 'Free delivery above ₹5,000 on eligible orders'}
            </span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">EMI available on select laptops & desktops</span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">Exchange offers on laptops — ask in store</span>
            <span className="marquee-item announcement-divider">|</span>
            <span className="marquee-item">Call {businessInfo.phones[0]} for instant quotes</span>
            <span className="marquee-item announcement-divider">|</span>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">
          <div className="mobile-header-row">
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'active' : ''}`} />
            </button>

            <Link href="/" className="brand-logo" onClick={closeMenu}>
              Foto Palace
            </Link>
          </div>

          <div className="desktop-header-row">
            <div>
              <Link href="/" className="brand-logo">
                Foto Palace
              </Link>
              <p className="brand-subtitle">Gar-Ali, Jorhat — laptops, gaming & CCTV</p>
            </div>

            <nav className="desktop-nav" aria-label="Main Navigation">
              {navItems.map((item) => {
                if (item.type === 'products') {
                  return (
                    <div className="desktop-nav-dropdown" key="products">
                      <button
                        type="button"
                        className="desktop-nav-link desktop-nav-products-btn"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="products-caret"
                          aria-hidden
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      <div className="desktop-dropdown-panel">
                        <div className="desktop-dropdown-inner">
                          {productCategories.map((key) => {
                            const meta = categoryMeta[key];
                            return (
                              <Link
                                key={meta.slug}
                                href={`/${meta.slug}`}
                                className="desktop-dropdown-cat-link"
                                onClick={closeMenu}
                              >
                                {meta.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} className="desktop-nav-link">
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="desktop-header-actions">
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn header-cta"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-backdrop ${isMenuOpen ? 'visible' : ''}`} onClick={closeMenu} />
      <nav className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-nav-header">
          <Link href="/" className="brand-logo" onClick={closeMenu}>
            Foto Palace
          </Link>
          <button type="button" className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-categories">
          {productCategories.map((key) => {
            const meta = categoryMeta[key];
            return (
              <Link key={meta.slug} href={`/${meta.slug}`} className="mobile-nav-cat-link" onClick={closeMenu}>
                {meta.label}
              </Link>
            );
          })}
        </div>

        <div className="mobile-nav-links">
          {navItems
            .filter((i) => i.type === 'link')
            .map((item) => (
              <Link
                key={(item as { href: string }).href}
                href={(item as { href: string }).href}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
        </div>

        <div className="mobile-nav-footer">
          <div className="mobile-nav-social-row">
            <SocialIcons />
          </div>
          <a
            href={`https://wa.me/${businessInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn mobile-nav-cta"
            onClick={closeMenu}
          >
            Get a Quote on WhatsApp
          </a>
          <a href={`tel:${businessInfo.phones[0]}`} className="mobile-nav-phone">
            📞 {businessInfo.phones[0]}
          </a>
        </div>
      </nav>
    </>
  );
}
