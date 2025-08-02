import './projects.css';
import { GoLinkExternal } from 'react-icons/go';

interface Project {
  title: string;
  description: string;
  link: { href: string; name: string };
  image: string;
}

export default function Projects() {
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
    },
  ];

  return (
    <section aria-label="Projects" className="projects" id="projects">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-list">
        {projectList.map((project) => (
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
