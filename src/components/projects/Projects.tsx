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
      title: 'AskUIZ',
      description:
        'Askuiz is an intelligent conversational assistant designed to answer student-related inquiries at Ibn Zohr University. it provides instant access to administrative information,',
      link: {
        name: 'askuiz.msaber.tech',
        href: 'https://askuiz.msaber.tech',
      },
      image: '/projects/askuiz.png',
    },
    {
      title: 'Hadith',
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
