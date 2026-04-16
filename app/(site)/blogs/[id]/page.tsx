import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { getStorefrontBlog } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getStorefrontBlog(id);
  if (!blog) {
    return pageMetadata({
      title: 'Blog not found',
      description: 'The requested blog article could not be found.',
      canonical: `/blogs/${id}`
    });
  }

  return pageMetadata({
    title: blog.title,
    description: blog.content.replace(/\s+/g, ' ').slice(0, 160),
    canonical: `/blogs/${blog.id || id}`
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await getStorefrontBlog(id);
  if (!blog) notFound();

  const paragraphs = blog.content
    .split(/\n{2,}/g)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="section">
      <div className="container narrow">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/blogs">Blogs</Link> / <span>{blog.title}</span>
        </nav>

        <article className="blog-article">
          <h1>{blog.title}</h1>
          <p className="blog-date">
            Published {new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {blog.images?.[0] ? (
            <div className="blog-hero-image-wrap">
              <StorefrontImage
                src={blog.images[0]}
                alt={blog.title}
                width={1200}
                height={680}
                className="blog-hero-image"
              />
            </div>
          ) : null}

          <div className="blog-content">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {blog.images?.length > 1 ? (
            <div className="blog-gallery">
              {blog.images.slice(1).map((img, index) => (
                <div key={`${img}-${index}`} className="blog-gallery-item">
                  <StorefrontImage src={img} alt={`${blog.title} image ${index + 2}`} fill className="blog-image" />
                </div>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </main>
  );
}
