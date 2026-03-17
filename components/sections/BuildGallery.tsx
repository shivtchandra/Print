import Image from 'next/image';

const galleryItems = [
  {
    title: 'Before Assembly',
    badge: 'Parts Selected',
    image:
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'After Assembly',
    badge: 'RTX 4060 Ready',
    image:
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80'
  }
];

export function BuildGallery() {
  return (
    <section className="section">
      <div className="container gallery-grid">
        {galleryItems.map((item) => (
          <article className="gallery-card" key={item.title}>
            <div className="gallery-image-wrap">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="gallery-copy">
              <h3>{item.title}</h3>
              <span className="badge">{item.badge}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
