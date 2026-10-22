import React from 'react';
import { FILM_STRIP } from '../data/content';

export default function Showreel({ onOpenVideo }) {
  return (
    <section className="showreel" id="reel">
      <div className="reel-head section-pad">
        <div>
          <span className="micro light-micro">03 / A FEELING, IN FRAMES</span>
          <h2>
            MAKE IT<br />
            <i>IMPOSSIBLE</i><br />
            TO IGNORE.
          </h2>
        </div>
        <div className="reel-head-side">
          <span className="scribble-star" aria-hidden="true">✳</span>
          <p>
            We think in stories, shots, sounds, systems and little details that make the whole thing click. Here's a taste of the visual world we're building.
          </p>
          <span className="micro light-micro">FILM · PHOTO · DESIGN · CULTURE</span>
        </div>
      </div>

      <div className="reel-frame-wrap">
        <div 
          className="reel-frame" 
          id="reelFrame" 
          role="button" 
          tabIndex={0} 
          aria-label="Play sample showreel video"
          onClick={onOpenVideo}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenVideo();
            }
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85" 
            alt="Showreel preview showing professional cinematography camera"
            loading="lazy" 
          />
          <div className="reel-colorwash"></div>
          
          <div className="reel-frame-content">
            <span className="micro">ODC / MOVING IMAGE STUDY</span>
            <div className="reel-bigtype">
              SOME<br />
              THINGS<br />
              <i>NEED TO</i><br />
              MOVE.
            </div>
            <span className="reel-frame-bottom micro">FILM IS A FEELING YOU CAN REPLAY.</span>
          </div>

          <button 
            className="giant-play" 
            type="button"
            aria-label="Play sample video"
          >
            <span>▶</span>
            <small>PRESS PLAY<br />FEEL SOMETHING</small>
          </button>

          <div className="reel-sticker">
            ROLL<br />WITH<br />IT <b>↗</b>
          </div>

          <span className="reel-corner micro">SAMPLE VISUAL — REPLACE WITH ODC SHOWREEL</span>
        </div>

        <div className="reel-caption-row">
          <span><b>01—03</b> / THE WORK SHOULD DO THE TALKING</span>
          <span>CAMERA ON. WORLD OFF. <b>↗</b></span>
        </div>
      </div>

      <div className="film-strip">
        {FILM_STRIP.map((shot, idx) => (
          <div className="strip-shot" key={idx}>
            <img src={shot.image} alt={shot.title} loading="lazy" />
            <span>{shot.title}</span>
          </div>
        ))}
      </div>

      <p className="asset-note">
        The moving-image and photo panels are visual direction placeholders, not a claim of completed client work. Replace them with your approved showreel and portfolio assets before launch.
      </p>
    </section>
  );
}
