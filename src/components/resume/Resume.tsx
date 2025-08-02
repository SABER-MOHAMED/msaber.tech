'use client';
import './resume.css';
import { useState, useEffect } from 'react';

interface Job {
  date: string;
  title: string;
  company: {
    link: string;
    name: string;
  };
  details: string[];
  startYear?: number;
  startMonth?: number;
  endYear?: number;
  endMonth?: number;
  color?: string;
}

export default function Resume() {
  const colors = ['#14b8a6', '#3b82f6', '#f59e0b', '#ef4444'];
  const currentYear = new Date().getFullYear();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parse dates and add colors
  const experience: Job[] = [
    {
      date: '06/2025 - 09/2025',
      title: 'Software Engineer',
      company: {
        link: 'https://www.linkedin.com/in/saber-codes/',
        name: 'Freelance',
      },
      details: [],
      startYear: 2025,
      startMonth: 6,
      endYear: 2025,
      endMonth: 9,
      color: colors[3],
    },

    {
      date: '02/2023 - 02/2025',
      title: 'Founding Frontend Engineer',
      company: {
        link: 'https://yutapp.com/',
        name: 'Yutapp - Full Time',
      },
      details: [
        'Been part of the founding team, check out the project at producthunt.com/products/yutapp/makers',
      ],
      startYear: 2023,
      startMonth: 2,
      endYear: 2025,
      endMonth: 2,
      color: colors[1],
    },
    {
      date: '07/2020 - 09/2020',
      title: 'Frontend Developer Intern',
      company: {
        link: 'https://fromtelecom.ma/',
        name: 'FromTelecom',
      },
      details: [],
      startYear: 2020,
      startMonth: 7,
      endYear: 2020,
      endMonth: 9,
      color: colors[2],
    },
  ];

  // Calculate timeline parameters with months
  const startYear = 2020;
  const endYear = currentYear + 1;

  // Generate array of years for display
  const timelineYears = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  // Calculate total months in the timeline for precise positioning
  const totalMonths = (endYear - startYear + 1) * 12;

  return (
    <section aria-label="Resume" className="resume" id="resume">
      <h2 className="resume-title">Work Experience</h2>

      {/* Horizontal Timeline Visualization */}
      <div className="timeline-visualization">
        {/* Scroll indicator for mobile */}
        <div className="timeline-scroll-indicator">→ Scroll →</div>

        {/* Year markers */}
        <div className="timeline-years">
          {timelineYears.map((year) => (
            <div key={year} className="timeline-year">
              {year}
            </div>
          ))}
        </div>

        {/* Job bars with metadata */}
        <div className="timeline-jobs">
          {experience.map((job, index) => {
            // Calculate position based on months for more precise visualization
            const startMonthsFromBeginning =
              ((job.startYear || startYear) - startYear) * 12 +
              (job.startMonth || 1) -
              1;
            const endMonthsFromBeginning =
              ((job.endYear || endYear) - startYear) * 12 +
              (job.endMonth || 12);

            // Convert to percentages
            const startPosition =
              (startMonthsFromBeginning / totalMonths) * 100;
            const endPosition = (endMonthsFromBeginning / totalMonths) * 100;
            const width = endPosition - startPosition;

            return (
              <div
                key={`job-container-${index}`}
                className="timeline-job-container"
              >
                <div
                  className="timeline-job-bar"
                  style={{
                    left: `${startPosition}%`,
                    width: `${width}%`,
                    backgroundColor: job.color,
                  }}
                  title={`${job.title} at ${job.company.name}`}
                />
                <div
                  className="timeline-job-info"
                  style={{
                    left: `${startPosition}%`,
                    width: `${width}%`,
                  }}
                >
                  <div className="timeline-job-title">{job.title}</div>
                  <div className="timeline-job-company">{job.company.name}</div>
                </div>
                {/* Hover card with detailed information */}
                <div
                  className="timeline-hover-card"
                  style={{
                    borderLeftColor: job.color,
                    left:
                      windowWidth <= 768
                        ? '0'
                        : `${Math.min(Math.max(startPosition, 0), 70)}%`,
                  }}
                >
                  <div className="timeline-card-title">{job.title}</div>
                  <div className="timeline-card-company">
                    {job.company.name}
                  </div>
                  <span className="timeline-card-date">{job.date}</span>
                  <ul className="timeline-card-details">
                    {job.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
