'use client';
import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../page';

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-container">
      <Link href="/blog" className="back-link">
        ← Back to all posts
      </Link>
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
        <div className="blog-content">{post.content}</div>
      </article>
    </main>
  );
}
