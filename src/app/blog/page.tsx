'use client';
import './blog.css';
import Link from 'next/link';
import { blogPosts } from '@/content/blog/blogsMetaData';

export default function Blog() {
  return (
    <main className="blog-container" id="blog">
      <h1>Blog Posts</h1>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index}>
            <article className="blog-card">
              <h2>{post.title}</h2>
              <div className="blog-date">{post.date}</div>
              <p className="blog-preview">{post.preview}</p>
              <div>
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
