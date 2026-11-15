import './contact.css';

export default function Contact() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/saber-codes',
      icon: '💼',
    },
    { name: 'GitHub', url: 'https://github.com/saber-mohamed', icon: '📦' },
    {
      name: 'Discord',
      url: 'https://discordapp.com/users/1027248544173785180',
      icon: '💬',
    },
    { name: 'Twitter', url: 'https://twitter.com/msaber__', icon: '🐦' },
  ];

  return (
    <section aria-label="Contact" className="contact" id="contact">
      <h2 className="contact-title">Let's Connect</h2>
      <div className="contact-info">
        <p className="contact-text">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="icon">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
