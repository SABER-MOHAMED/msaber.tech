import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import '@/content/blog/blogsMetaData';

export interface BlogPost {
  title: string;
  slug: string;
  preview: string;
  date: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title:
      'Analyzing RFID Anti-Collision Protocols: Performance Insights From Recent Research',
    slug: 'rfid-anti-collision-protocols',
    preview:
      'RFID technology is widely used in various applications, and understanding the performance of anti-collision protocols is crucial for optimizing their efficiency. In this post, we will analyze recent research on RFID anti-collision protocols and provide insights into their performance.',
    date: '2025-04-05',
    tags: ['Networking', 'RFID', 'Research'],
  },
  {
    title: 'JavaScript Generators: A Comprehensive Overview',
    slug: 'javascript-generators-overview',
    preview:
      'JavaScript Generators are a powerful feature that allows you to create iterators in a more elegant way. In this post, we will explore how generators work, their syntax, and practical use cases.',
    date: '2023-04-30',
    tags: ['Software engineering'],
  },
];

export default async function BlogPost({ params }: any) {
  if (!params?.slug || params.slug.length === 0) {
    notFound();
  }

  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the blog component based on the slug
  const BlogComponent = dynamic(() =>
    import(`@/content/blog/${params.slug}.tsx`).catch(() => notFound())
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
        <div className="blog-content">
          <BlogComponent />
        </div>
      </article>
    </main>
  );
}
