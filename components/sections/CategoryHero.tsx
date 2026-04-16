import { StorefrontImage } from '@/components/media/StorefrontImage';

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export function CategoryHero({ title, subtitle, image }: CategoryHeroProps) {
  const hasImage = Boolean(image?.trim());

  return (
    <section className={`category-hero ${hasImage ? '' : 'category-hero-no-photo'}`}>
      {hasImage ? (
        <StorefrontImage src={image} alt={title} fill sizes="100vw" className="category-hero-image" priority />
      ) : (
        <div className="category-hero-gradient" aria-hidden />
      )}
      <div className="hero-overlay" />
      <div className="container category-hero-copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
