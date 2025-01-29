import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Home() {
  return (
    <>
      <header className="navbar">
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="logo"
            style={{
              height: '50px',
              objectFit: 'cover',
            }}
          />
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a href="#about">.about()</a>
            </li>
            <li>
              <a href="#resume">.resume()</a>
            </li>
            <li>
              <a href="#projects">.projects()</a>
            </li>
            <li>
              <a href="#contact">.contact()</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <div className="description">
          <p>
            <span
              style={{
                background: 'linear-gradient(to right, #316FF6, #FF6F00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hi
            </span>
            , I'm Mohamed Saber
          </p>
          <br />
          <p>
            I'm a Frontend Engineer with a passion for crafting beautiful,
            intuitive, and responsive user interfaces for web and mobile
            applications. I specialize in turning ideas into seamless digital
            experiences, with a keen eye for design and a love for clean,
            efficient code.
          </p>
          <br />
          <p>
            I'm deeply passionate about frontend development, user experience,
            and exploring the intersection of technology and creativity. Whether
            it's building dynamic web apps or optimizing performance for mobile,
            I thrive on solving problems and delivering solutions that make an
            impact.
          </p>
          <br />
          <p>Let's build something amazing together!</p>
        </div>
      </main>
      <footer className="footer">
        <div className="email-container">
          <div className="email-line"></div>
          <a href="mailto:mohamed.saber@edu.uiz.ac.ma" className="email">
            mohamed.saber@edu.uiz.ac.ma
          </a>
        </div>
        <div className="socials">
          <div className="socials-line"></div>
          <a href="https://x.com/msaber__">
            <FaXTwitter size={24} />
          </a>
          <a href="https://ma.linkedin.com/in/saber-codes">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/SABER-mohamed">
            <FaGithub size={24} />
          </a>
        </div>
      </footer>
      <div className="ta7iya">Ta7iya L Chrifiya</div>
    </>
  );
}
