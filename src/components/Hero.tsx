import './hero.css';

export default function Hero() {
  return (
    <section aria-label="About Me" className="hero" id="about">
      <h1 className="hero-title">I'm Mohamed Saber</h1>

      <p className="hero-subtitle"></p>
      <p className="hero-description">
        I'm deeply passionate about frontend development, user experience, and
        exploring the intersection of technology and creativity. Whether it's
        building dynamic mobile apps or optimizing performance for web apps, I
        thrive on solving problems and delivering solutions that make an impact.
      </p>
      <a href="#contact" className="hero-button">
        Let's collaborate
      </a>
    </section>
  );
}
