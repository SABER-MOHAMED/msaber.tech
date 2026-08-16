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
      <div className="hero-bio">
        <p>
          I hold an M.Sc. in Embedded Artificial Intelligence from{' '}
          <a
            href="https://www.uiz.ac.ma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ibn Zohr University
          </a>
          , and conducted research with the{' '}
          <a
            href="https://www.utwente.nl/en/eemcs/caes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CAES (Computer Architecture for Embedded Systems) Group
          </a>{' '}
          at the{' '}
          <a
            href="https://www.utwente.nl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Twente
          </a>
          , supervised by{' '}
          <a
            href="https://people.utwente.nl/a.yousefzadeh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dr. ir. Amirreza Yousefzadeh
          </a>
          . My research centers on{' '}
          <span className="highlight">Hardware-Software Co-Design</span>,{' '}
          <span className="highlight">Model Optimization</span>, and{' '}
          <span className="highlight">Neuromorphic & Edge Architectures</span>.
          For my master’s thesis, I investigated scaling Vision Transformer
          (DeiT) blocks onto SparkRV—an open-source RISC-V many-core neuromorphic
          processor—focusing on on-chip SRAM constraints, custom firmware
          operators, and multi-core Network-on-Chip (NoC) distribution.
          For more information about my thesis, you can check my{' '}
          <a
            href="/content/Thesis_Abstract.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thesis Abstract.
          </a>
        </p>

        <p>
          Alongside my academic research, I worked as an AI Software Engineer at{' '}
          <a
            href="https://www.linkedin.com/company/fandasoft"
            target="_blank"
            rel="noopener noreferrer"
          >
            FandaSoft
          </a>
          , building automated DSL generation and model evaluation pipelines via
          AWS Bedrock. Also, I worked for 2 years as a Founding Software Engineer
          at{' '}
          <a href="https://yutapp.com/" target="_blank" rel="noopener noreferrer">
            Yutapp.
          </a>
        </p>
      </div>

      <div className="hero-buttons">
        <a href="#contact" className="hero-button hero-button-secondary">
          Contact
        </a>
        <a
          href="/content/Mohamed Saber CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button hero-button-primary"
        >
          View CV
        </a>
      </div>
    </section>
  );
}
