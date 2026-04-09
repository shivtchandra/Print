'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';
import { useCart } from '@/components/providers/CartContext';
import { categoryMeta } from '@/lib/data/catalog';

type NavItem =
  | { type: 'link'; href: string; label: string }
  | { type: 'products'; label: string };

const navItems: NavItem[] = [
  { type: 'link', href: '/', label: 'Home' },
  { type: 'products', label: 'Products' },
  { type: 'link', href: '/about', label: 'About' },
  { type: 'link', href: '/contact', label: 'Contact' }
];

const productCategories = Object.keys(categoryMeta) as (keyof typeof categoryMeta)[];

export function Header() {
  const { businessInfo } = useConfig();
  const { totalItems, openDrawer } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  }

  const CartIcon = (
    <button className="cart-icon-btn" onClick={openDrawer} aria-label="Open cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </button>
  );

  return (
    <>
      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span>{businessInfo.adBannerText || 'Free delivery on orders above ₹5,000'}</span>
          <span className="announcement-divider">|</span>
          <a href={`tel:${businessInfo.phones[0]}`}>
            Call {businessInfo.phones[0]} for instant quotes
          </a>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Mobile layout: hamburger | logo | cart */}
          <div className="mobile-header-row">
            <button
              className="menu-toggle"
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsProductsOpen(false); }}
              aria-label="Toggle Menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
            </button>

            <Link href="/" className="brand-logo" onClick={closeMenu}>
              Foto Palace
            </Link>

            <div className="mobile-header-actions">
              {CartIcon}
            </div>
          </div>

          {/* Desktop layout: logo + nav + cta + cart */}
          <div className="desktop-header-row">
            <div>
              <Link href="/" className="brand-logo">Foto Palace</Link>
              <p className="brand-subtitle">No 1 Tech Store in Jorhat</p>
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
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="products-caret">
                          <path d="m6 9 6 6 6-6"/>
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
              {CartIcon}
            </div>
          </div>
        </div>

        {/* ===== MOBILE SLIDE-IN DRAWER ===== */}
        <div className={`mobile-nav-backdrop ${isMenuOpen ? 'visible' : ''}`} onClick={closeMenu} />
        <nav className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
          <div className="mobile-nav-header">
            <Link href="/" className="brand-logo" onClick={closeMenu}>Foto Palace</Link>
            <button className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
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
            {navItems.filter(i => i.type === 'link').map((item) => (
              <Link key={(item as { href: string }).href} href={(item as { href: string }).href} className="mobile-nav-link" onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobile-nav-footer">
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


      </header>
    </>
  );
}
