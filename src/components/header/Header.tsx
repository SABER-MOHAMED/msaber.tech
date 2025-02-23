'use client';
import { useState } from 'react';
import './header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="nav-container">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo"
          style={{ height: '50px', objectFit: 'cover' }}
        />
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>.about()</a>
          </li>
          <li>
            <a href="#resume" onClick={() => setIsMenuOpen(false)}>.resume()</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>.contact()</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
