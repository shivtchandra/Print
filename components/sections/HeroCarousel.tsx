'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { useConfig } from '@/components/providers/ConfigProvider';

export function HeroCarousel() {
  const { heroSlides, businessInfo } = useConfig();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = heroSlides.filter((s) => s.image?.trim());
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = hasSlides ? slides[activeSlide] : null;
  const title = currentSlide?.title ?? `${businessInfo.name} · Jorhat`;
  const subtitle =
    currentSlide?.subtitle ??
    `${businessInfo.tagline} — ${businessInfo.phones[0] ? `Call ${businessInfo.phones[0]}` : 'Visit Gar-Ali'}`;

  return (
    <section className={`hero-carousel ${hasSlides ? '' : 'hero-carousel-static'}`}>
      <div className="hero-split">
        <div className="hero-split-copy">
          <span className="hero-badge">Foto Palace · Jorhat</span>
          <h1 className="hero-split-title" key={hasSlides ? activeSlide : 'static'}>
            {title}
          </h1>
          <p className="hero-split-sub" key={hasSlides ? `sub-${activeSlide}` : 'sub-static'}>
            {subtitle}
          </p>
          <div className="hero-split-actions">
            <Link href="/laptops" className="primary-btn hero-cta-primary">
              Browse Collection
            </Link>
            <Link href="/contact" className="hero-cta-ghost">
              Get a Quote
            </Link>
          </div>

          {hasSlides && slides.length > 1 && (
            <div className="hero-split-dots" role="tablist" aria-label="Hero Slides">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="hero-split-image-panel">
          {hasSlides ? (
            slides.map((slide, index) => (
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
            ))
          ) : (
            <div className="hero-split-image-wrap active hero-split-image-placeholder" aria-hidden>
              <div className="hero-split-gradient-fill" />
            </div>
          )}
          <div className="hero-split-edge" />
        </div>
      </div>
    </section>
  );
}
