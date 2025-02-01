import { FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="email-container">
        <div className="line"></div>
        <a href="mailto:mrsabermed@gmail.com" className="email">
          mrsabermed@gmail.com
        </a>
      </div>
      <div className="socials">
        <div className="line"></div>

        <a href="https://ma.linkedin.com/in/saber-codes">
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com/SABER-mohamed">
          <FaGithub size={24} />
        </a>
        <a href="https://discordapp.com/users/1027248544173785180">
          <FaDiscord size={24} />
        </a>
      </div>
    </footer>
  );
}
