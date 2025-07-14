interface BlogPost {
  title: string;
  slug: string;
  preview: string;
  date: string;
  tags: string[];
  coAuthor?: {
    name: string;
    link: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Building a RAG System with LlamaIndex, Pinecone, and GPT-4',
    slug: 'build-rag-system',
    preview:
      "Retrieval-Augmented Generation systems, enhance the capabilities of language models by integrating external knowledge sources. In this article, we'll explore how to build a RAG system using Pinecone, a vector database that excels in handling large-scale data.",
    date: '2025-07-06',
    tags: ['AI', 'RAG'],
    coAuthor: {
      name: 'Issam Echchariy',
      link: 'https://www.linkedin.com/in/issam-echchariy/',
    },
  },
  {
    title:
      'Analyzing RFID Anti-Collision Protocols: Performance Insights From Recent Research',
    slug: 'rfid-anti-collision-protocols',
    preview:
      'RFID technology is widely used in various applications, and understanding the performance of anti-collision protocols is crucial for optimizing their efficiency. In this post, we will analyze recent research on RFID anti-collision protocols and provide insights into their performance.',
    date: '2025-04-05',
    tags: ['Networking', 'RFID', 'Research'],
    coAuthor: {
      name: 'Ayoub Hammad',
      link: 'https://www.linkedin.com/in/ayoub-hammad-b4b713265/',
    },
  },
  {
    title: 'JavaScript Generators: A Comprehensive Overview',
    slug: 'js-generators',
    preview:
      'JavaScript Generators are a powerful feature that allows you to create iterators in a more elegant way. In this post, we will explore how generators work, their syntax, and practical use cases.',
    date: '2023-04-30',
    tags: ['Software engineering'],
  },
];
