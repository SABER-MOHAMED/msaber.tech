import './resume.css';

interface Job {
  date: string;
  title: string;
  company: {
    link: string;
    name: string;
  };
  details: string[];
}

export default function Resume() {
  const experience: Job[] = [
    {
      date: '06/2023 - 07/2025',
      title: 'Frontend Engineer',
      company: {
        link: 'https://www.mabiplus.ma/',
        name: 'MabiPlus - Freelance',
      },
      details: [
        'Refactoring legacy code to improve performance and maintainability;',
        'Ensuring responsive design across multiple devices for a seamless UX;',
        'Collaborating with tech leads and other engineers to align on implementation and functionality, and doing code review.',
      ],
    },
    {
      date: '02/2023 - 02/2025',
      title: 'Founding Frontend Engineer',
      company: {
        link: 'https://yutapp.com/',
        name: 'Yutapp - Full Time',
      },
      details: [
        'been part of the founding team, check out the project at https://www.producthunt.com/products/yutapp/makers',
      ],
    },
    {
      date: '07/2020 - 09/2022',
      title: 'Frontend Developer Intern',
      company: {
        link: 'https://fromtelecom.ma/',
        name: 'FromTelecom',
      },
      details: [
        // 'Developed responsive web applications',
        // 'Implemented CI/CD pipelines',
        // 'Reduced bug reports by 30%',
      ],
    },
  ];
  return (
    <section aria-label="Resume" className="resume" id="resume">
      <h2 className="resume-title">Work Experience</h2>

      <div className="timeline">
        {experience.map((job, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <span className="timeline-date">{job.date}</span>
              <h3 className="timeline-title">{job.title}</h3>
              <a href={job.company.link} className="timeline-company">
                {job.company.name}
              </a>
              <ul className="timeline-details">
                {job.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
