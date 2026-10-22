import React, { useRef, useState, useEffect } from 'react';
import { CLIENT_PARTNERS } from '../data/content';

export default function ClientMarquee() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll loop when user is not manually scrolling or dragging
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId;
    let isHovered = false;

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    const step = () => {
      if (!isHovered && !isDragging && el) {
        el.scrollLeft += 0.8;
        // Seamless loop back when halfway through
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <section className="client-trust-section" aria-label="Selected Clients and Collaborations">
      <div className="client-trust-tag">
        <span className="micro">SELECTED COLLABORATORS & PATRONS</span>
        <span className="client-tag-line"></span>
        <span className="micro">2024 — 2026 ARCHIVE</span>
      </div>

      <div 
        className="client-marquee-container is-scrollable"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div className="client-marquee-track is-manual">
          {/* Repeated items for infinite continuous scroll */}
          {[...CLIENT_PARTNERS, ...CLIENT_PARTNERS, ...CLIENT_PARTNERS].map((client, idx) => {
            const content = (
              <>
                <span className="client-dot" aria-hidden="true">✳</span>
                <span className="client-name">{client.name}</span>
                <span className="client-meta">{client.category}</span>
                {client.link && <span className="client-link-arrow">↗</span>}
              </>
            );

            return client.link ? (
              <a
                key={idx}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="client-pill client-pill-link"
                title={`Visit ${client.name} website`}
                onClick={(e) => {
                  // prevent accidental click during drag
                  if (isDragging) e.preventDefault();
                }}
              >
                {content}
              </a>
            ) : (
              <div className="client-pill" key={idx}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
