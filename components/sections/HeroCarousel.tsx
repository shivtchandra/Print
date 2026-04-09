'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { useConfig } from '@/components/providers/ConfigProvider';

export function HeroCarousel() {
  const { heroSlides } = useConfig();
  const [activeSlide, setActiveSlide] = useState(0);

  // Desktop: image slide auto-rotation
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="hero-carousel">
      {/* ===== HERO SLIDES (Visible on all devices) ===== */}
      <div className="hero-split">
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
                sizes="(max-width: 899px) 100vw, 55vw"
                className="hero-split-img"
              />
            </div>
          ))}
          {/* Thin tinted edge to blend with dark left panel */}
          <div className="hero-split-edge" />
        </div>
      </div>
    </section>
  );
}
