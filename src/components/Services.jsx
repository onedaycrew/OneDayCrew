import React from 'react';
import { SERVICES } from '../data/content';

export default function Services({ onSelectService, onOpenContact }) {
  return (
    <section className="services" id="services">
      <div className="services-top section-pad">
        <div>
          <span className="micro">05 / WHAT WE BRING TO THE TABLE</span>
          <h2>
            THE RIGHT<br />
            PEOPLE FOR<br />
            <i>THE RIGHT IDEA.</i>
          </h2>
        </div>
        <div className="services-aside">
          <div className="service-doodle" aria-hidden="true">✳</div>
          <p>
            We don't force your idea into a package. We put together the people and skills that make sense for where you want to go.
          </p>
          <span className="micro">START SMALL. BUILD THE WHOLE THING.</span>
        </div>
      </div>

      <div className="service-list">
        {SERVICES.map((service) => (
          <button
            key={service.index}
            className="service-row"
            type="button"
            data-service={service.serviceKey}
            onClick={() => onSelectService(service.serviceKey)}
          >
            <span className="service-index">{service.index}</span>
            <span className="service-title">
              {service.name}
              <small>{service.categoryBadge}</small>
            </span>
            <span className="service-desc">{service.description}</span>
            <span className="service-image">
              <img 
                src={service.previewImage} 
                alt={`${service.name} visual preview`}
                loading="lazy" 
              />
            </span>
            <span className="service-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="services-foot section-pad">
        <span className="micro">NOT A BIG AGENCY WITH BIG AGENCY BAGGAGE.</span>
        <p>
          A nimble crew, built around <i>your</i> ambition.
        </p>
        <button 
          className="pill-button yellow-button" 
          type="button"
          onClick={onOpenContact}
        >
          FIND YOUR CREW <span>↗</span>
        </button>
      </div>
    </section>
  );
}
