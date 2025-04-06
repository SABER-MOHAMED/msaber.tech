'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import './header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsMenuOpen(false);
    if (pathname !== '/' && href.startsWith('/#')) {
      window.location.href = href;
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="nav-logo">
          <a href="/" aria-label="Home">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="logo"
              style={{ height: '50px', objectFit: 'cover' }}
            />
          </a>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a href="/#resume" onClick={(e) => handleNavClick(e, '/#resume')}>
              /resume
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')}>
              /contact
            </a>
          </li>
          <li>
            <a href="/blog" onClick={(e) => handleNavClick(e, '/blog')}>
              /blog
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
