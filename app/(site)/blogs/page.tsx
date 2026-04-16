import Link from 'next/link';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { getStorefrontBlogs } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Blogs',
  description:
    'Read Foto Palace blogs for laptop buying guides, gaming PC tips, printer setup, CCTV advice, and local tech updates from Jorhat.',
  canonical: '/blogs'
});

function excerpt(text: string, max = 180) {
  const compact = text.replace(/\s+/g, ' ').trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max)}...`;
}

export default async function BlogsPage() {
  const blogs = await getStorefrontBlogs();

  return (
    <main className="section">
      <div className="container">
        <div className="section-head">
          <h1>Blogs</h1>
          <p>Tech articles and store updates from Foto Palace.</p>
        </div>

        {blogs.length === 0 ? (
          <p className="empty-catalog-hint">No published blogs yet. Add blogs from the admin dashboard.</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
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
                    <h2>{blog.title}</h2>
                    <p>{excerpt(blog.content)}</p>
                    <span className="blog-read-more">Read full article</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
