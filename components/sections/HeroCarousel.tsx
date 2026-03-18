'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useConfig } from '@/components/providers/ConfigProvider';

export function HeroCarousel() {
  const { heroSlides } = useConfig();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      if (heroSlides.length > 0) {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="hero-carousel">
      {heroSlides.map((slide, index) => (
        <article
          key={slide.title}
          className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
          aria-hidden={index !== activeSlide}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="container hero-copy">
            <span className="hero-sub fade-up"> Foto Palace | Vengavasal </span>
            <h1 className="fade-up delay-1">{slide.title}</h1>
            <p className="fade-up delay-2">{slide.subtitle}</p>
            <div className="hero-actions fade-up delay-3">
              <Link href="/laptops" className="primary-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Browse Collection
              </Link>
            </div>
          </div>
        </article>
      ))}
      <div className="hero-dots" role="tablist" aria-label="Hero Slides">
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
    </section>
  );
}
