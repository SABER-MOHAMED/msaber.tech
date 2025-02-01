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
      date: '08/2023 - Present',
      title: 'Software Engineer',
      company: {
        link: 'https://yutapp.com/',
        name: 'Yutapp',
      },
      details: [
        'Contributed to 3+ projects, including a React Native app',
        'Conducted interviews and participated in hiring decisions',
        'Mentored junior developers and conducted code reviews',
        '',
      ],
    },
    {
      date: '02/2023 - 08/2023',
      title: 'Software Engineer Intern',
      company: {
        link: 'https://yutapp.com/',
        name: 'Yutapp',
      },
      details: [],
    },
    {
      date: '07/2020 - 09/2022',
      title: 'Frontend Developer Intern',
      company: {
        link: 'https://fromtelecom.ma/',
        name: 'FromTelecom',
      },
      details: [
        'Developed responsive web applications',
        'Implemented CI/CD pipelines',
        'Reduced bug reports by 30%',
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
