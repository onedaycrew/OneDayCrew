import React from 'react';
import { SITE_META } from '../data/content';

export default function Careers({ onOpenContact }) {
  const handleOpenForm = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="careers-section section-pad" id="careers">
      <div className="section-tag">
        <span className="micro">08 / TALENT &amp; CULTURE</span>
        <span className="rule"></span>
        <span className="micro">CURIOUS MINDS WELCOME</span>
      </div>

      <div className="careers-grid">
        <div className="careers-left">
          <h2>
            CURIOUS<br />
            MINDS<br />
            <span>WELCOME.</span>
          </h2>
          <p className="opportunities-note">
            Opportunities are shared when available. We believe the best people aren't always looking for job titles — they're looking for work that matters.
          </p>
        </div>

        <div className="careers-right">
          <div className="careers-orbit-stamp" aria-hidden="true">
            ODC<br />
            <span>✳</span>
            <small>OPEN<br />DOORS</small>
          </div>

          <div className="opportunities-grid">
            <article className="opportunity-card">
              <div className="opportunity-card-top">
                <span className="opportunity-badge">ROLE / 01</span>
                <h3 className="opportunity-title">Careers</h3>
                <p className="opportunity-desc">
                  Interested in working with the crew? Introduce yourself and share your proof of work.
                </p>
              </div>
              <a 
                href={SITE_META.careersForm}
                target="_blank"
                rel="noopener noreferrer"
                className="opportunity-action-btn"
                style={{ textDecoration: 'none' }}
              >
                <span>Apply for Careers</span>
                <span className="opportunity-arrow">↗</span>
              </a>
            </article>

            <article className="opportunity-card">
              <div className="opportunity-card-top">
                <span className="opportunity-badge">ROLE / 02</span>
                <h3 className="opportunity-title">Internships</h3>
                <p className="opportunity-desc">
                  Starting out and want to say hello? Tell us what you're learning, building, and exploring.
                </p>
              </div>
              <a 
                href={SITE_META.internshipsForm}
                target="_blank"
                rel="noopener noreferrer"
                className="opportunity-action-btn"
                style={{ textDecoration: 'none' }}
              >
                <span>Apply for Internship</span>
                <span className="opportunity-arrow">↗</span>
              </a>
            </article>
          </div>
        </div>
      </div>

      <div className="careers-ribbon">
        <span>NO PORTFOLIO POLISH NEEDED.</span>
        <b>✳</b>
        <span>JUST SHOW US THE HUNGER AND THE CRAFT.</span>
      </div>
    </section>
  );
}
