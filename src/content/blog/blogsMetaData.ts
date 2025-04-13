'use client';
export interface BlogPost {
  title: string;
  slug: string;
  preview: string;
  date: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
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
