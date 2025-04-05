import './hero.css';

export default function Hero() {
  return (
    <section aria-label="About Me" className="hero" id="about">
      <h1 className="hero-title">I'm Mohamed Saber</h1>
      <p className="hero-subtitle">
        Still crafting code that pays the bills in{' '}
        <span className="highlight">Software Engineering</span>, while exploring
        a world where <span className="highlight">intelligence</span> meets{' '}
        <span className="highlight">resource-limited hardware</span>.
      </p>

      <p className="hero-description">
        A minimalist, action-driven, and performance-focused developer with over
        2 years of experience in software development. I’ve contributed to
        diverse projects and tackled countless challenges — especially around
        performance, user experience, and maintainability. I’m currently
        pursuing a Master’s degree in Embedded AI, where I'm exploring the
        integration of AI into resource-constrained and real-time systems.
      </p>

      <a href="#contact" className="hero-button">
        Let's connect
      </a>
    </section>
  );
}
