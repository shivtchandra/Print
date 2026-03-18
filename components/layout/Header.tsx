'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/laptops', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const { businessInfo } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        <div className={`header-content ${isMenuOpen ? 'open' : ''}`}>
          <nav className="nav" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
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
  );
}
