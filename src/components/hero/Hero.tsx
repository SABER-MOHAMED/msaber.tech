import './hero.css';

export default function Hero() {
  return (
    <section aria-label="About Me" className="hero" id="about">
      <h1 className="hero-title">I'm Mohamed Saber</h1>

      <p className="hero-subtitle">
        a Software Engineer specialized in{' '}
        <span className="highlight">Frontend</span> &amp;{' '}
        <span className="highlight">Mobile</span> Development, currently
        exploring <span className="highlight">Embedded AI technology.</span>
      </p>
      <p className="hero-description">
        Have been doing software development for 2 years+, I'm deeply
        experienced in building generic software solutions. My journey has been
        enriched by contributing to diverse projects and collaborating with
        dynamic teams. During my journey I tackeled a lot of challenges in terms
        of performance, UX, and maintainability, and I'm always open to explore
        new technologies and methodologies.
      </p>
      <a href="#contact" className="hero-button">
        Let's collaborate
      </a>
    </section>
  );
}
