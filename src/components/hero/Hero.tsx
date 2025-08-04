import Image from 'next/image';
import './hero.css';

export default function Hero() {
  return (
    <section aria-label="About Me" className="hero" id="about">
      <Image
        src="/images/mohamed-saber.jpg"
        alt="Mohamed Saber"
        className="hero-image"
        width={200}
        height={200}
      />
      <h2 className="hero-title">Mohamed Saber</h2>
      <p className="hero-subtitle">
        Master's candidate in <span className="highlight">Embedded AI</span>{' '}
        with 2+ years of professional{' '}
        <span className="highlight">software engineering</span> experience. I'm
        continuously expanding my knowledge in{' '}
        <span className="highlight">NLP</span>,{' '}
        <span className="highlight">Computer Vision</span>,{' '}
        <span className="highlight">Embedded Systems Architecture</span>, with a
        passion for building intelligent, AI-Agent based applications.
        Throughout my academic and professional journey, I have contributed to
        diverse projects spanning{' '}
        <span className="highlight">performance optimization</span>,{' '}
        <span className="highlight">system architecture</span>,{' '}
        <span className="highlight">machine learning</span>, and{' '}
        <span className="highlight">user experience design</span>. I strive to
        understand emerging methods for running AI models efficiently on
        resource-constrained devices, bringing advanced AI concepts closer to
        practical embedded applications. I am actively seeking opportunities to
        leverage my engineering background and research expertise to contribute
        to innovative projects in <span className="highlight">AI research</span>
        , <span className="highlight">embedded systems</span>, and{' '}
        <span className="highlight">intelligent software solutions</span>.
      </p>

      <div className="hero-buttons">
        <a href="#contact" className="hero-button hero-button-secondary">
          Contact
        </a>
        <a
          href="/content/Mohamed-Saber-CV.pdf"
          className="hero-button hero-button-primary"
        >
          View CV
        </a>
      </div>
    </section>
  );
}
