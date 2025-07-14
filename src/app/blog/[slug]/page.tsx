'use client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { blogPosts } from '@/content/blog/blogsMetaData';
import '../blog.css';

export default async function BlogPost({ params }: any) {
  const { slug } = params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  const BlogComponent = dynamic(() =>
    import(`@/content/blog/${slug}.jsx`).catch(() => notFound())
  );

  return (
    <main className="blog-container">
      <article className="blog-post">
        <h1>{post.title}</h1>
        <div className="blog-date">{post.date}</div>
        <div className="blog-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
        {post?.coAuthor ? (
          <div className="blog-author">
            <p>
              This article is co-authored with{' '}
              <a
                href={post.coAuthor.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.coAuthor.name}
              </a>
            </p>
          </div>
        ) : null}
        <div className="blog-content">
          <BlogComponent />
        </div>
      </article>
    </main>
  );
}
