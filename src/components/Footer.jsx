import React from 'react';

export default function Footer({ onOpenContact }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <a 
          className="footer-brand" 
          href="#top" 
          onClick={scrollToTop}
          aria-label="One Day Crew home"
        >
          <svg viewBox="0 0 100 100" className="footer-svg-mark">
            <circle cx="50" cy="50" r="48" fill="#f9b041" />
            <circle cx="50" cy="50" r="46" fill="#ed3f36" />
            <text x="50" y="58" textAnchor="middle" fill="#fff9f0" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="30">
              ODC
            </text>
          </svg>
          <span>
            <b>ONE DAY CREW®</b>
            <small>MEDIA / MARKETING / CREATIVE</small>
          </span>
        </a>

        <p>
          For the things<br />
          you're here to do.
        </p>

        <button 
          className="back-top" 
          id="backToTop" 
          type="button"
          onClick={scrollToTop}
        >
          BACK TO TOP ↑
        </button>
      </div>

      <div className="footer-bottom">
        <span>
          © {currentYear} ONE DAY CREW. MADE TOGETHER.
        </span>
        <span>EVERYONE HAS THAT ONE DAY.</span>
        <span>
          <a href="#work">WORK</a>
          {" / "}
          <a href="#services">SERVICES</a>
          {" / "}
          <a href="#careers">CAREERS</a>
          {" / "}
          <button 
            type="button" 
            onClick={() => onOpenContact()}
          >
            CONTACT
          </button>
        </span>
      </div>
    </footer>
  );
}
