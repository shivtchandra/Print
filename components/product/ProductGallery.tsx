'use client';

import { useState } from 'react';
import { StorefrontImage } from '@/components/media/StorefrontImage';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-placeholder">
        <span>No images available</span>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {images.length > 1 && (
        <div className="thumbnails-vertical">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`thumb-item ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              aria-label={`View photo ${idx + 1}`}
            >
              <StorefrontImage
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="main-stage">
        <div className="main-image-wrap">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`stage-image-overlay ${idx === activeIdx ? 'visible' : ''}`}
            >
              <StorefrontImage
                src={img}
                alt={title}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
