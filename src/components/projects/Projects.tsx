'use client';
import { useState } from 'react';
import './projects.css';
import { GoArrowUpRight, GoLinkExternal } from 'react-icons/go';
import { FaLinkedin } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

type Category = 'all' | 'ai-embedded' | 'software-tools';
type LinkKind = 'linkedin' | 'marketplace' | 'website';

interface Project {
  title: string;
  description: string;
  link: { href: string; name: string; kind: LinkKind };
  image: string;
  imageFit?: 'cover' | 'contain';
  imageBackground?: string;
  highlight?: string;
  tags: string[];
  category: Exclude<Category, 'all'>;
}

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai-embedded', label: 'AI & Embedded Systems' },
  { key: 'software-tools', label: 'Software Engineering & Tools' },
];

const categoryLabels: Record<Project['category'], string> = {
  'ai-embedded': 'AI & Embedded',
  'software-tools': 'Software & Tools',
};

const linkIcons: Record<LinkKind, typeof GoLinkExternal> = {
  linkedin: FaLinkedin,
  marketplace: VscVscode,
  website: GoLinkExternal,
};

const projectList: Project[] = [
  {
    title: 'Highway Traffic Tracking on Raspberry Pi 5',
    description:
      'Tracks vehicles on a highway from a Raspberry Pi 5, combining YOLOv8 object detection with DeepSORT multi-object tracking.',
    link: {
      name: 'Watch on LinkedIn',
      kind: 'linkedin',
      href: 'https://www.linkedin.com/in/saber-codes/overlay/projects/845173325/multiple-media-viewer/?profileId=ACoAADY24RQBoEeRHbAXUeS9FCPmiaRlUeAfhMw&treasuryMediaId=1753191830839',
    },
    image: '/projects/highway-vehicle-tracking.jpeg',
    tags: ['YOLOv8', 'DeepSORT', 'Raspberry Pi 5'],
    category: 'ai-embedded',
  },
  {
    title: 'AskUIZ',
    description:
      'A university AI agent for Ibn Zohr University students. It retrieves from campus documents with embeddings and semantic search, so answers come from the university’s own pages.',
    link: {
      name: 'Watch the demo',
      kind: 'linkedin',
      href: 'https://www.linkedin.com/posts/saber-codes_ai-rag-chatbot-activity-7354489281999949824-JpXb',
    },
    image: '/projects/askuiz.png',
    tags: ['Python', 'Vector database', 'Semantic search'],
    category: 'ai-embedded',
  },
  {
    title: 'Hadith',
    description:
      'A VS Code extension that shows a random Hadith inside your editor, made for Muslim developers.',
    link: {
      name: 'Install from Marketplace',
      kind: 'marketplace',
      href: 'https://marketplace.visualstudio.com/items?itemName=MohamedSaber.hadith',
    },
    image: '/projects/hadith.png',
    imageFit: 'contain',
    imageBackground: '#033b3b',
    highlight: '2.3K+ downloads',
    tags: ['VS Code extension'],
    category: 'software-tools',
  },
  {
    title: 'Drivtur',
    description:
      'Contributed to Drivtur, a platform that connects driving instructors with learners who want to build confidence behind the wheel.',
    link: {
      name: 'Visit website',
      kind: 'website',
      href: 'https://www.drivtur.com/',
    },
    image: '/projects/drivtur.png',
    tags: ['Web platform', 'Contributor'],
    category: 'software-tools',
  },
  {
    title: 'Reservari',
    description:
      'Collaborated with the Reservari engineering team on an application for restaurant reservations and management.',
    link: {
      name: 'Visit website',
      kind: 'website',
      href: 'https://www.reservari.ma/',
    },
    image: '/projects/reservari.png',
    tags: ['Web app', 'Contributor'],
    category: 'software-tools',
  },
];

const featuredProject = {
  title: 'NoC Router: Multi-core Mesh in SystemVerilog',
  description:
    'Five-port routers with XY routing and one register per hop, on a multi-core mesh whose core count is meant to scale. Each flit carries the destination coordinates and a 32-bit payload.',
  specs: [
    { label: 'Topology', value: '3×3 mesh, five-port routers' },
    { label: 'Routing', value: 'Dimension-ordered XY' },
    { label: 'Latency', value: 'One register per hop' },
    { label: 'Flit', value: '36 bits: dest Y, dest X, 32-bit payload' },
  ],
  tags: ['SystemVerilog', 'Icarus Verilog', 'GTKWave'],
  link: {
    name: 'View on GitHub',
    href: 'https://github.com/SABER-MOHAMED/NoC-Router',
  },
};

const MESH_SIZE = 3;
const MESH_PITCH = 100;
const MESH_ORIGIN = 50;
const ROUTER_SIZE = 44;
// XY route of the repo's test packet: east twice, then south twice.
const ROUTE = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
];

const meshPoint = (index: number) => MESH_ORIGIN + index * MESH_PITCH;

function NocMeshDiagram() {
  const isOnRoute = (x: number, y: number) =>
    ROUTE.some(([rx, ry]) => rx === x && ry === y);
  const routePath = `M${ROUTE.map(
    ([x, y]) => `${meshPoint(x)} ${meshPoint(y)}`
  ).join(' L')}`;
  const routers = Array.from({ length: MESH_SIZE * MESH_SIZE }, (_, i) => ({
    x: i % MESH_SIZE,
    y: Math.floor(i / MESH_SIZE),
  }));

  return (
    <svg
      className="noc-diagram"
      viewBox="0 0 300 300"
      role="img"
      aria-label="3 by 3 router mesh: a packet travels from router (0,0) east to (2,0), then south to (2,2)"
    >
      <defs>
        <filter id="noc-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {routers.map(({ x, y }) => (
        <g key={`links-${x}-${y}`} className="noc-link">
          {x < MESH_SIZE - 1 && (
            <line
              x1={meshPoint(x)}
              y1={meshPoint(y)}
              x2={meshPoint(x + 1)}
              y2={meshPoint(y)}
            />
          )}
          {y < MESH_SIZE - 1 && (
            <line
              x1={meshPoint(x)}
              y1={meshPoint(y)}
              x2={meshPoint(x)}
              y2={meshPoint(y + 1)}
            />
          )}
        </g>
      ))}

      <path className="noc-route" d={routePath} />

      {routers.map(({ x, y }) => (
        <g
          key={`router-${x}-${y}`}
          className={`noc-router${isOnRoute(x, y) ? ' on-route' : ''}`}
        >
          <rect
            x={meshPoint(x) - ROUTER_SIZE / 2}
            y={meshPoint(y) - ROUTER_SIZE / 2}
            width={ROUTER_SIZE}
            height={ROUTER_SIZE}
            rx={6}
          />
          <text x={meshPoint(x)} y={meshPoint(y) + 3.5}>
            ({x},{y})
          </text>
        </g>
      ))}

      <text className="noc-endpoint" x={meshPoint(0)} y={16}>
        SRC
      </text>
      <text className="noc-endpoint" x={meshPoint(2)} y={293}>
        DST
      </text>

      <g className="noc-packet">
        <circle r={6} filter="url(#noc-glow)">
          <animateMotion
            path={routePath}
            dur="4s"
            repeatCount="indefinite"
            calcMode="linear"
            keyPoints="0;0;0.25;0.25;0.5;0.5;0.75;0.75;1;1"
            keyTimes="0;0.15;0.25;0.35;0.45;0.55;0.65;0.75;0.85;1"
          />
        </circle>
      </g>
    </svg>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projectList
      : projectList.filter((project) => project.category === activeFilter);

  return (
    <section aria-label="Projects" className="projects" id="projects">
      <h2 className="projects-title">Projects</h2>

      <article className="project-featured">
        <div className="project-featured-visual">
          <NocMeshDiagram />
          <p className="noc-caption">
            deadbeef: (0,0) → (2,2) in 5 cycles
          </p>
        </div>
        <div className="project-featured-content">
          <span className="project-featured-badge">Featured</span>
          <h3 className="project-featured-title">{featuredProject.title}</h3>
          <p className="project-featured-description">
            {featuredProject.description}
          </p>
          <dl className="project-featured-specs">
            {featuredProject.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="project-featured-tags">
            {featuredProject.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a
            href={featuredProject.link.href}
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {featuredProject.link.name}
            <GoLinkExternal className="project-link-icon" />
          </a>
        </div>
      </article>

      <div className="projects-filters" role="group" aria-label="Filter projects">
        {categories.map((cat) => {
          const count =
            cat.key === 'all'
              ? projectList.length
              : projectList.filter((project) => project.category === cat.key)
                  .length;
          return (
            <button
              key={cat.key}
              type="button"
              className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
              aria-pressed={activeFilter === cat.key}
            >
              {cat.label}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="projects-list">
        {filteredProjects.map((project) => {
          const LinkIcon = linkIcons[project.link.kind];
          return (
            <a
              className="project-card"
              key={project.title}
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`project-media${
                  project.imageFit === 'contain' ? ' contain' : ''
                }`}
                style={{ background: project.imageBackground }}
              >
                <img
                  src={project.image}
                  alt=""
                  className="project-image"
                  loading="lazy"
                />
                {project.highlight && (
                  <span className="project-highlight">{project.highlight}</span>
                )}
              </div>
              <div className="project-content">
                <span className="project-category">
                  {categoryLabels[project.category]}
                </span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="project-cta">
                  <LinkIcon className="project-cta-icon" aria-hidden />
                  {project.link.name}
                  <GoArrowUpRight className="project-cta-arrow" aria-hidden />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
