'use client';
import './blog.css';
import Link from 'next/link';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  preview: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: 'My Journey in Software Engineering',
    slug: 'my-journey-in-software-engineering',
    date: '2023-10-01',
    preview:
      'In this blog post, I share my journey in software engineering, the challenges I faced, and the lessons I learned along the way.',
    content:
      'In this blog post, I share my journey in software engineering, the challenges I faced, and the lessons I learned along the way. It has been a long and rewarding journey, filled with ups and downs. I started coding at a young age, and over the years, I have worked on various projects that have shaped my skills and knowledge.',
    tags: ['Software Engineering', 'Journey', 'Personal'],
  },
];

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
