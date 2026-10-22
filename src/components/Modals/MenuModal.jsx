import React, { useEffect } from 'react';

export default function MenuModal({ isOpen, onClose, onOpenContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="menu-screen is-open" 
      id="menuScreen" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Navigation Menu"
    >
      <div className="menu-top">
        <span className="micro">ODC® — THE MENU</span>
        <button 
          id="menuClose" 
          className="close-pill" 
          type="button"
          onClick={onClose}
        >
          CLOSE <b>×</b>
        </button>
      </div>

      <div className="menu-body">
        <div className="menu-links">
          <a href="#work" onClick={onClose}>
            <small>01</small>
            <span>Work</span>
            <span className="menu-arrow">↗</span>
          </a>

          <a href="#services" onClick={onClose}>
            <small>02</small>
            <span>What we do</span>
            <span className="menu-arrow">↗</span>
          </a>

          <a href="#story" onClick={onClose}>
            <small>03</small>
            <span>Our story</span>
            <span className="menu-arrow">↗</span>
          </a>

          <a href="#careers" onClick={onClose}>
            <small>04</small>
            <span>Careers &amp; Internships</span>
            <span className="menu-arrow">↗</span>
          </a>

          <button 
            type="button" 
            onClick={() => {
              onClose();
              onOpenContact();
            }}
          >
            <small>05</small>
            <span>Start something</span>
            <span className="menu-arrow">↗</span>
          </button>
        </div>

        <div className="menu-stamp">
          <span>GOOD THINGS</span>
          <b>TAKE<br />A CREW.</b>
          <i>✳</i>
          <small>EVERYONE HAS THAT ONE DAY.</small>
        </div>
      </div>

      <div className="menu-bottom">
        <span>MEDIA / MARKETING / CREATIVE</span>
        <span>MADE TOGETHER, NOT IN A VACUUM.</span>
      </div>
    </div>
  );
}
