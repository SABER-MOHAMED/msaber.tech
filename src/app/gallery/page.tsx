'use client';

import Image from 'next/image';
import { milestones } from '@/content/gallery/galleryData';
import './gallery.css';

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <div className="milestones-grid">
        {milestones.map((milestone) => (
          <article key={milestone.id} className="milestone-item">
            <div className="milestone-image-wrap">
              <Image
                src={milestone.image}
                alt={milestone.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                className="milestone-img"
              />
            </div>
            <p className="milestone-sentence">{milestone.sentence}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
