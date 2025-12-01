import Image from 'next/image';

export default function BuildRAGSystem() {
  return (
    <div>
      <Image
        src="/blog/git-github-workshop.png"
        className="blog-hero-image"
        alt="Git & GitHub Workshop"
        width={800}
        height={400}
        priority
      />

      <p>01 December, 2025 ・🕒 2 min read</p>

      <a
        href="/content/git-github-workshop-slides.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Slides
      </a>
      <br />
      <a
        href="/content/Git_Github.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Practical Examples file
      </a>
    </div>
  );
}
