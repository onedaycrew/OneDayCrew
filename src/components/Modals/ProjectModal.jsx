import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/content';

export default function ProjectModal({ project, onClose, onOpenContact, onSelectProject }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image whenever a new project is loaded
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  const currentIndex = PROJECTS.findIndex(p => p.id === project?.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  const galleryImages = project?.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project?.heroImage];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (galleryImages.length > 1 && activeImageIndex < galleryImages.length - 1) {
          setActiveImageIndex(prev => prev + 1);
        } else {
          onSelectProject(nextProject);
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeImageIndex > 0) {
          setActiveImageIndex(prev => prev - 1);
        } else {
          onSelectProject(prevProject);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, activeImageIndex, galleryImages, nextProject, prevProject, onClose, onSelectProject]);

  if (!project) return null;

  const currentImage = galleryImages[activeImageIndex] || project.heroImage;

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div 
      className="project-overlay is-open" 
      id="projectOverlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="projectTitle"
      onClick={(e) => {
        if (e.target.id === 'projectOverlay') {
          onClose();
        }
      }}
    >
      <button 
        className="project-close" 
        id="projectClose" 
        type="button"
        aria-label="Close project details"
        onClick={onClose}
      >
        ×
      </button>

      <div className="project-detail" id="projectDetail">
        <div className="project-top-nav">
          <span className="micro">{project.no}</span>
          <div className="project-quick-nav">
            <button 
              type="button" 
              className="quick-nav-pill"
              onClick={() => onSelectProject(prevProject)}
              title={`Previous: ${prevProject.title}`}
            >
              <ArrowLeft size={12} /> PREV
            </button>
            <span className="quick-nav-count">{currentIndex + 1} / {PROJECTS.length}</span>
            <button 
              type="button" 
              className="quick-nav-pill"
              onClick={() => onSelectProject(nextProject)}
              title={`Next: ${nextProject.title}`}
            >
              NEXT <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <h2 id="projectTitle">
          {project.title.includes('—') ? (
            <>
              <span className="brand-highlight-name">{project.title.split('—')[0].trim()}</span>
              <span className="brand-tagline-rest"> — {project.title.split('—')[1]}</span>
            </>
          ) : (
            project.title
          )}
        </h2>
        <div className="project-category-row">
          <div className="project-category">{project.category}</div>
          {project.externalUrl && (
            <a 
              href={project.externalUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modal-live-link-pill"
            >
              <span>{project.externalUrl.replace('https://', '').replace(/\/$/, '')}</span>
              <span className="arrow-out">↗</span>
            </a>
          )}
        </div>

        {/* Gallery Carousel Viewer */}
        <div className="project-gallery-viewer">
          <img 
            className="project-visual" 
            src={currentImage} 
            alt={`Visual direction for ${project.title} - Frame ${activeImageIndex + 1}`} 
          />

          {galleryImages.length > 1 && (
            <>
              <button 
                type="button" 
                className="gallery-nav-btn gallery-prev" 
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                type="button" 
                className="gallery-nav-btn gallery-next" 
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="gallery-counter">
                {activeImageIndex + 1} OF {galleryImages.length}
              </div>
            </>
          )}
        </div>

        {/* Gallery Thumbnail Strip */}
        {galleryImages.length > 1 && (
          <div className="project-thumbnails">
            {galleryImages.map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                className={`thumb-btn ${activeImageIndex === i ? 'is-active' : ''}`}
                onClick={() => setActiveImageIndex(i)}
                aria-label={`View frame ${i + 1}`}
              >
                <img src={imgUrl} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Proof of Work Reel section if project has videoUrl */}
        {project.videoUrl && (
          <div className="project-proof-reel-banner">
            <div className="proof-reel-header">
              <span className="live-dot pulse"></span>
              <strong>AUTHENTIC PROOF OF WORK: ON-SET FOOTAGE (9:16 REEL)</strong>
            </div>
            <div className="proof-reel-layout">
              <div className="proof-reel-phone-wrapper">
                <video 
                  src={project.videoUrl} 
                  controls 
                  playsInline 
                  autoPlay 
                  muted 
                  loop 
                  className="proof-reel-phone-video"
                />
              </div>
              <div className="proof-reel-details">
                <span className="micro">FIVE DEPARTMENTS IN ACTION</span>
                <h3>Behind the Scenes with {project.title.split('—')[0].trim()}</h3>
                <p>
                  No mockups, no stock footage. Real craft executed by our 5 specialized departments:
                </p>
                <div className="proof-depts-grid">
                  <div className="proof-dept-item">
                    <span className="p-num">01</span>
                    <div>
                      <strong>Graphic Design</strong>
                      <p>Visual identity, custom packaging cues &amp; typography</p>
                    </div>
                  </div>
                  <div className="proof-dept-item">
                    <span className="p-num">02</span>
                    <div>
                      <strong>Photo &amp; Videography</strong>
                      <p>High-end appetite photography, on-set direction &amp; reel cuts</p>
                    </div>
                  </div>
                  <div className="proof-dept-item">
                    <span className="p-num">03</span>
                    <div>
                      <strong>Social Media &amp; Digital</strong>
                      <p>Community hype, launch teaser assets &amp; content scheduling</p>
                    </div>
                  </div>
                  <div className="proof-dept-item">
                    <span className="p-num">04</span>
                    <div>
                      <strong>Websites &amp; Platforms</strong>
                      <p>Interactive ordering web experience &amp; micro-interactions</p>
                    </div>
                  </div>
                  <div className="proof-dept-item">
                    <span className="p-num">05</span>
                    <div>
                      <strong>Sales &amp; Growth Funnel</strong>
                      <p>Direct-to-consumer conversion mechanics and traction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="project-columns">
          <div>
            <p className="project-copy-main">{project.copy}</p>
            {project.clientTestimonial && (
              <blockquote className="project-quote">
                “{project.clientTestimonial}”
                <cite>— {project.quoteAuthor}</cite>
              </blockquote>
            )}
          </div>
          <div>
            <div className="project-deliverables-box">
              <strong>Possible outputs &amp; deliverables</strong>
              <p>{project.deliverables}</p>
            </div>
            
            {project.metrics && (
              <div className="project-metrics-grid">
                {project.metrics.map((m, i) => (
                  <div key={i} className="metric-tag">
                    <span className="metric-dot">●</span> {m}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="project-disclaimer">{project.tag}</p>

        <div className="project-action-row">
          <div className="project-action-group">
            <button 
              className="pill-button red-button" 
              id="projectStart"
              type="button"
              onClick={() => {
                onClose();
                // Smart map project to service option
                let serviceToSelect = 'Websites & Web Apps';
                if (project.id === 'butterly') serviceToSelect = 'Websites & Web Apps';
                else if (project.id === 'blue-peak') serviceToSelect = 'Real Estate & Digital Platforms';
                else if (project.id === 'giggs') serviceToSelect = 'Websites & Web Apps';
                else if (project.id === 'price-drop') serviceToSelect = 'Product Design & Mobile Apps';
                else if (project.id === 'butcherly') serviceToSelect = 'Brand Identity & Packaging';
                else if (project.id === 'creator-circle') serviceToSelect = 'Influencer & Event Coverage';
                onOpenContact(serviceToSelect);
              }}
            >
              BUILD SOMETHING LIKE THIS <span>↗</span>
            </button>

            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button"
                style={{ background: 'var(--paper2)', color: 'var(--ink)', border: '1px solid var(--line)', textDecoration: 'none' }}
              >
                VISIT LIVE SITE <span>↗</span>
              </a>
            )}
          </div>

          <div className="project-browse-footer">
            <button 
              type="button" 
              className="browse-footer-btn"
              onClick={() => onSelectProject(nextProject)}
            >
              <span>NEXT CASE STUDY</span>
              <b>{nextProject.title} →</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
