import React from 'react';

export default function Header({
  theme,
  onToggleTheme,
  onOpenContact,
  onOpenMenu,
  menuOpen
}) {
  return (
    <header className="header" id="top">
      <a 
        className="brand" 
        href="#top" 
        aria-label="One Day Crew home"
      >
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="brand-svg-mark">
            <circle cx="50" cy="50" r="48" fill="#f9b041" />
            <circle cx="50" cy="50" r="46" fill="#ed3f36" />
            <text x="50" y="58" textAnchor="middle" fill="#fff9f0" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="30">
              ODC
            </text>
          </svg>
        </span>
        <span className="brand-word">
          <b>ONE DAY CREW<span>®</span></b>
          <small>MEDIA / MARKETING / CREATIVE</small>
        </span>
      </a>

      <nav className="nav" aria-label="Main navigation">
        <a href="#work">
          The work <i>↘</i>
        </a>
        <a href="#services">
          What we do <i>↘</i>
        </a>
        <a href="#story">
          The story <i>↘</i>
        </a>
        <a href="#careers">
          Careers &amp; Internships <i>↘</i>
        </a>
      </nav>

      <div className="head-actions">
        {/* Theme Toggle Button */}
        <button
          className="theme"
          id="themeToggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="theme-symbol">{theme === 'dark' ? '☼' : '◐'}</span>
          <span className="theme-text">{theme === 'dark' ? 'LIGHT SIDE' : 'DARK SIDE'}</span>
        </button>

        {/* Contact CTA */}
        <button
          className="lets-talk"
          type="button"
          onClick={onOpenContact}
        >
          LET'S MAKE IT <span>↗</span>
        </button>

        {/* Instant WhatsApp Quick Call / Chat Icon */}
        <a
          href="https://wa.me/919353736101?text=Hi%20One%20Day%20Crew!%20I'd%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="header-whatsapp-btn"
          aria-label="Direct WhatsApp Chat with One Day Crew"
          title="Chat directly on WhatsApp (9353736101)"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>

        {/* Mobile Menu Hamburger */}
        <button
          className="menu-toggle"
          id="menuToggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <span className={menuOpen ? 'bar-top' : ''}></span>
          <span className={menuOpen ? 'bar-mid' : ''}></span>
          <span className={menuOpen ? 'bar-bot' : ''}></span>
        </button>
      </div>
    </header>
  );
}
