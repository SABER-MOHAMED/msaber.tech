import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './hero.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="email-container">
        <div className="email-line"></div>
        <a href="mailto:mohamed.saber@edu.uiz.ac.ma" className="email">
          mrsabermed@gmail.com
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
  );
}
