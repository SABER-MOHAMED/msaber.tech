import './hero.css';

export default function Hero() {
  return (
    <section aria-label="About Me" className="hero" id="about">
      <h1 className="hero-title">Mohamed Saber</h1>
      <p className="hero-subtitle">
        Born to do <span className="highlight">Software Engineering</span>,
        forced to deep dive into{' '}
        <span className="highlight">Hardware Engineering</span>.
      </p>

      <p className="hero-description">
        have and still delivering software for over 2 years .contributed to
        diverse projects. tackled countless challenges around performance, user
        experience, and maintainability. currently pursuing a Master’s degree in
        Embedded AI.
      </p>

      <a href="#contact" className="hero-button">
        Let's connect
      </a>
    </section>
  );
}
