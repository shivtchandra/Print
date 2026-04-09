'use client';

import Link from 'next/link';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';
import { Product } from '@/lib/types/entities';

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const { heroSlides, mobileHeroProductIds } = useConfig();
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileStripRef = useRef<HTMLDivElement>(null);

  // Desktop: image slide auto-rotation
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Mobile hero products: use admin-selected IDs, fallback to featured
  const mobileProducts = useMemo(() => {
    const active = products.filter((p) => p.status === 'active' && p.id);
    if (mobileHeroProductIds && mobileHeroProductIds.length > 0) {
      const byId = new Map(active.map((p) => [p.id, p]));
      const selected = mobileHeroProductIds
        .map((id) => byId.get(id))
        .filter(Boolean) as Product[];
      if (selected.length > 0) return selected;
    }
    const featured = active.filter((p) => p.isFeatured);
    return featured.length > 0 ? featured.slice(0, 6) : active.slice(0, 6);
  }, [products, mobileHeroProductIds]);

  // Scroll-snap observer for mobile index tracking
  useEffect(() => {
    const root = mobileStripRef.current;
    if (!root || mobileProducts.length === 0) return;

    const items = Array.from(root.children) as HTMLElement[];
    if (items.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.5)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = items.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setMobileIndex(idx);
      },
      { root, threshold: [0.5, 0.8] }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mobileProducts]);

  const scrollToSlide = useCallback((index: number) => {
    const root = mobileStripRef.current;
    const card = root?.children[index] as HTMLElement | undefined;
    if (!root || !card) return;
    const left = root.scrollLeft + (card.getBoundingClientRect().left - root.getBoundingClientRect().left);
    root.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    setMobileIndex(index);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="hero-carousel">
      {/* ===== DESKTOP: Split-panel hero (hidden on mobile) ===== */}
      <div className="hero-split hero-split-desktop">
        {/* LEFT: Copy panel */}
        <div className="hero-split-copy">
          <span className="hero-badge">Foto Palace · Jorhat</span>
          <h1 className="hero-split-title" key={activeSlide}>
            {currentSlide?.title ?? 'No 1 Tech Store in Jorhat'}
          </h1>
          <p className="hero-split-sub" key={`sub-${activeSlide}`}>
            {currentSlide?.subtitle ?? 'Best Deals on Laptops, Gaming PCs, Printers & More'}
          </p>
          <div className="hero-split-actions">
            <Link href="/laptops" className="primary-btn hero-cta-primary">
              Browse Collection
            </Link>
            <Link href="/contact" className="hero-cta-ghost">
              Get a Quote
            </Link>
          </div>

          {/* Slide dots inside copy panel */}
          {heroSlides.length > 1 && (
            <div className="hero-split-dots" role="tablist" aria-label="Hero Slides">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Image panel */}
        <div className="hero-split-image-panel">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.title}
              className={`hero-split-image-wrap ${index === activeSlide ? 'active' : ''}`}
              aria-hidden={index !== activeSlide}
            >
              <StorefrontImage
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="55vw"
                className="hero-split-img"
              />
            </div>
          ))}
          {/* Thin tinted edge to blend with dark left panel */}
          <div className="hero-split-edge" />
        </div>
      </div>

      {/* ===== MOBILE: Product card carousel (hidden on desktop) ===== */}
      {mobileProducts.length > 0 && (
        <div className="mobile-hero-products">
          <div
            ref={mobileStripRef}
            className="mobile-hero-strip"
            aria-label="Featured products"
          >
            {mobileProducts.map((product, idx) => (
              <Link
                key={`${product.id}-${idx}`}
                href={`/product/${product.id}`}
                className="mobile-hero-card"
              >
                <div className="mobile-hero-card-image">
                  <StorefrontImage
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="85vw"
                    priority={idx === 0}
                    className="mobile-hero-card-img"
                  />
                </div>
                <div className="mobile-hero-card-info">
                  <h3>{product.title}</h3>
                  <p className="mobile-hero-card-price">{product.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Simple dot indicators */}
          {mobileProducts.length > 1 && (
            <div className="mobile-hero-dots">
              {mobileProducts.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`mobile-hero-dot ${idx === mobileIndex ? 'active' : ''}`}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Product ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
