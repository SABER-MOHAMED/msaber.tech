'use client';
import { useState } from 'react';
import './projects.css';
import { GoLinkExternal } from 'react-icons/go';

type Category = 'all' | 'ai-embedded' | 'software-tools';

interface Project {
  title: string;
  description: string;
  link: { href: string; name: string };
  image: string;
  category: Category;
}

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai-embedded', label: 'AI & Embedded Systems' },
  { key: 'software-tools', label: 'Software Engineering & Tools' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const projectList: Project[] = [
    {
      title: 'Traffic Tracking System Deployed on Raspberry Pi 5',
      description:
        'System that tracks highway traffic, deployed on a Raspberry Pi 5, uses YOLOv8 for object detection combined with DeepSORT for multi-object tracking.',
      link: {
        name: 'View on LinkedIn',
        href: 'https://www.linkedin.com/in/saber-codes/overlay/projects/845173325/multiple-media-viewer/?profileId=ACoAADY24RQBoEeRHbAXUeS9FCPmiaRlUeAfhMw&treasuryMediaId=1753191830839',
      },
      image: '/projects/highway-vehicle-tracking.jpeg',
      category: 'ai-embedded',
    },
    {
      title: 'AskUIZ',
      description:
        "An intelligent conversational assistant designed to answer student' pedagogical inquiries at Ibn Zohr University. It provides instant access to administrative information.",
      link: {
        name: 'Demo on LinkedIn',
        href: 'https://www.linkedin.com/posts/saber-codes_ai-rag-chatbot-activity-7354489281999949824-JpXb',
      },
      image: '/projects/askuiz.png',
      category: 'ai-embedded',
    },
    {
      title: 'Hadith 2.3K+ Downloads',
      description:
        'A VSCode extension that displays a random Hadith in your coding environment. Designed for Muslim developers.',
      link: {
        name: 'add to VSCode',
        href: 'https://marketplace.visualstudio.com/items?itemName=MohamedSaber.hadith',
      },
      image: '/projects/hadith.png',
      category: 'software-tools',
    },
    {
      title: 'Drivtur',
      description:
        'I contributed to the development of Drivtur, a platform that connects driving instructors with learners seeking to build confidence behind the wheel.',
      link: {
        name: 'Link to Website',
        href: 'https://www.drivtur.com/',
      },
      image: '/projects/drivtur.png',
      category: 'software-tools',
    },
    {
      title: 'Reservari',
      description:
        'I have been collaborating with the Reservari engineering team to develop an application that will revolutionize restaurant reservations and management.',
      link: {
        name: 'Link to Website',
        href: 'https://www.reservari.ma/',
      },
      image: '/projects/reservari.png',
      category: 'software-tools',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projectList
      : projectList.filter((project) => project.category === activeFilter);

  return (
    <section aria-label="Projects" className="projects" id="projects">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-filters">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.title}>
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.link.href}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.link.name}
                <GoLinkExternal className="project-link-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
