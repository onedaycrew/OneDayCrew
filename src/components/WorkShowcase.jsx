import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/content';

export default function WorkShowcase({ onSelectProject, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.filterKey === activeFilter);

  const filterButtons = [
    { key: 'all', label: 'ALL VENTURES', count: `0${PROJECTS.length}` },
    { key: 'client', label: 'ACTIVE PARTNERS' },
    { key: 'upcoming', label: 'UPCOMING APPS & VENTURES' }
  ];

  return (
    <section className="work section-pad" id="work">
      <div className="section-tag">
        <span className="micro">04 / THE VENTURES &amp; ARCHIVE</span>
        <span className="rule"></span>
        <span className="micro">LIVE CLIENTS · UPCOMING PLATFORMS</span>
      </div>

      <div className="work-heading">
        <h2>
          MADE OF<br />
          <em>MANY THINGS.</em>
        </h2>
        <div>
          <p>
            From high-craving artisanal bakeries to cutting-edge digital platforms, gig economy engines, and farm-to-fork meat brands — we shape, build and launch ambitious ventures.
          </p>
          <div className="work-filters" role="group" aria-label="Filter projects">
            {filterButtons.map(btn => (
              <button
                key={btn.key}
                type="button"
                className={`filter ${activeFilter === btn.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(btn.key)}
              >
                {btn.label}
                {btn.count && <span>{btn.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="work-mosaic" id="workMosaic">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className={`work-card card-${project.id}`}
            tabIndex={0}
            role="button"
            aria-label={`Open ${project.title} details`}
            onClick={() => onSelectProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(project);
              }
            }}
          >
            <div className="card-image">
              <img 
                src={project.heroImage} 
                alt={project.title} 
                loading="lazy" 
              />
              
              {/* Unique card overlays matching brand character */}
              {project.id === 'butterly' && (
                <div className="butterly-overlay">
                  <span>FRESH FROM<br />THE FEELING.</span>
                  <b>BUTTER<br />BETTER.</b>
                  <i>✳</i>
                </div>
              )}

              {project.id === 'blue-peak' && (
                <div className="sound-overlay bluepeak-overlay">
                  <span className="micro">ELEVATE THE SUMMIT / 002</span>
                  <b>BLUE<br /><i>PEAK.</i></b>
                  <div className="sound-waves" aria-hidden="true">
                    {[...Array(9)].map((_, i) => (
                      <i key={i}></i>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'giggs' && (
                <div className="wear-overlay giggs-overlay">
                  <span className="micro">THE FREEDOM WORK ENGINE / 003</span>
                  <b>GET<br /><i>GIGGS.</i></b>
                  <span className="wear-play" aria-hidden="true">⚡</span>
                </div>
              )}

              {project.id === 'price-drop' && (
                <div className="object-overlay ratepulse-overlay">
                  <span className="micro">PRICE MATCH &amp; DIRECT BOOK / 004</span>
                  <b>RATE<br /><i>PULSE.</i></b>
                  <span className="object-seal">LOWEST<br />GUARANTEED</span>
                </div>
              )}

              {project.id === 'butcherly' && (
                <div className="butterly-overlay butcherly-overlay">
                  <span>ARTISANAL COLD-CHAIN MEATS</span>
                  <b>PRIME<br />CUTS.</b>
                  <i style={{ color: '#ed3f36' }}>✳</i>
                </div>
              )}

              {project.id === 'creator-circle' && (
                <div className="wear-overlay creator-overlay">
                  <span className="micro">CURATED TASTEMAKERS / 006</span>
                  <b>CREATOR<br /><i>CIRCLE.</i></b>
                  <span className="wear-play" aria-hidden="true">★</span>
                </div>
              )}

              <span className="concept-label">{project.badgeText}</span>
            </div>

            <div className="work-card-meta">
              <div>
                <span className="micro">{project.category}</span>
                <h3>
                  {project.title.includes('—') ? (
                    <>
                      <span className="brand-highlight-name">{project.title.split('—')[0].trim()}</span>
                      <span className="brand-tagline-rest"> — {project.title.split('—')[1]}</span>
                    </>
                  ) : (
                    project.title
                  )}
                </h3>
                {project.externalUrl && (
                  <span className="card-live-url">
                    {project.externalUrl.replace('https://', '').replace(/\/$/, '')}
                  </span>
                )}
              </div>
              <span className="work-arrow" aria-hidden="true">
                {project.externalUrl ? <ExternalLink size={18} /> : '↗'}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="work-bottom">
        <span className="micro">WE DON'T NEED EVERY IDEA TO LOOK THE SAME.</span>
        <button 
          className="pill-button dark-button" 
          type="button"
          onClick={onOpenContact}
        >
          BRING US YOUR IDEA <span>↗</span>
        </button>
      </div>
    </section>
  );
}
