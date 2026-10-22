import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

const WHATSAPP_NUMBER = '919353736101';

export default function MobileFloatingDock({ onOpenContact }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down past hero (~280px)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hi One Day Crew, I'd like to discuss a project.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <aside className="mobile-floating-dock" aria-label="Quick Actions">
      <div className="mobile-dock-inner">
        <button
          type="button"
          className="dock-btn dock-whatsapp"
          onClick={handleWhatsApp}
          aria-label="Chat on WhatsApp"
        >
          <span className="dock-icon-bubble">
            <MessageSquare size={15} />
          </span>
          <span className="dock-label">WhatsApp</span>
        </button>

        <button
          type="button"
          className="dock-btn dock-action"
          onClick={() => onOpenContact()}
          aria-label="Start Project Enquiry"
        >
          <span className="dock-label">Start Project</span>
          <ArrowUpRight size={15} className="dock-arrow" />
        </button>
      </div>
    </aside>
  );
}
