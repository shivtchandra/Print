'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';
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

export function Header() {
  const { businessInfo } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const productCategories = Object.keys(categoryMeta) as (keyof typeof categoryMeta)[];

  function closeMenu() {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-brand-row">
          <div>
            <Link href="/" className="brand-logo">
              Foto Palace
            </Link>
            <p className="brand-subtitle">No 1 Tech Store in Vengavasal</p>
          </div>
          
          <button 
            className="menu-toggle" 
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsProductsOpen(false);
            }}
            aria-label="Toggle Menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        <div className={`header-content ${isMenuOpen ? 'open' : ''}`}>
          <nav className="nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              if (item.type === 'products') {
                return (
                  <div
                    className="nav-dropdown"
                    key="products"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      type="button"
                      className={`nav-link nav-dropdown-toggle ${isProductsOpen ? 'active' : ''}`}
                      aria-expanded={isProductsOpen}
                      onClick={() => setIsProductsOpen((v) => !v)}
                    >
                      {item.label}
                    </button>

                    {isProductsOpen && (
                      <ul className="nav-dropdown-menu nav-dropdown-menu-open" aria-label="Products categories">
                        {productCategories.map((key) => {
                          const meta = categoryMeta[key];
                          const href = `/${meta.slug}`;
                          const isLaptops = meta.slug === 'laptops';
                          return (
                            <li key={meta.slug}>
                              <Link
                                href={href}
                                className={`nav-sublink ${isLaptops ? 'highlight' : ''}`}
                                onClick={closeMenu}
                              >
                                {meta.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              }

              return (
                <Link key={item.href} href={item.href} className="nav-link" onClick={closeMenu}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <a 
              href={`https://wa.me/${businessInfo.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-btn header-cta"
              onClick={closeMenu}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
