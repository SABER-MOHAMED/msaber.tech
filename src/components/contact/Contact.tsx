'use client';
import { useForm, ValidationError } from '@formspree/react';
import './contact.css';

export default function Contact() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_KEY || ''
  );

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

  const handleSubmitContactForm = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <section aria-label="Contact" className="contact" id="contact">
      <h2 className="contact-title">Let's Connect</h2>
      <div className="contact-container">
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

        {state.succeeded ? (
          <p className="contact-text">Your message has been sent!</p>
        ) : (
          <></>
        )}
        <form
          className={`contact-form ${state.succeeded ? 'hidden' : ''}`}
          onSubmit={handleSubmitContactForm}
        >
          <div className="form-group">
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <textarea
              placeholder="Your Message"
              id="message"
              name="message"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
