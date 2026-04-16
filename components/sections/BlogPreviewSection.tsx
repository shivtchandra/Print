import Link from 'next/link';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { BlogPost } from '@/lib/types/entities';

interface BlogPreviewSectionProps {
  blogs: BlogPost[];
}

function excerpt(text: string, max = 130) {
  const compact = text.replace(/\s+/g, ' ').trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max)}...`;
}

export function BlogPreviewSection({ blogs }: BlogPreviewSectionProps) {
  if (blogs.length === 0) return null;

  const top = blogs.slice(0, 6);
  return (
    <section className="section" id="blogs">
      <div className="container">
        <div className="section-head">
          <h2>
            <span className="text-accent">Latest</span> Blogs
          </h2>
          <p>Tips, buying guides, and local tech updates from Foto Palace.</p>
        </div>

        <div className="blog-grid">
          {top.map((blog) => (
            <article key={blog.id || blog.title} className="blog-card">
              <Link href={`/blogs/${blog.id}`} className="blog-card-link">
                <div className="blog-thumb">
                  {blog.images?.[0] ? (
                    <StorefrontImage
                      src={blog.images[0]}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="blog-image"
                    />
                  ) : (
                    <div className="blog-image-placeholder" aria-hidden />
                  )}
                </div>
                <div className="blog-body">
                  <h3>{blog.title}</h3>
                  <p>{excerpt(blog.content)}</p>
                  <span className="blog-read-more">Read full article</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="testimonial-cta-row">
          <Link href="/blogs" className="secondary-btn">
            View all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
