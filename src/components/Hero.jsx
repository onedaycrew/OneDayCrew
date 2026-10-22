import React, { useState, useEffect } from 'react';

export default function Hero({ onOpenContact }) {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setIstTime(timeStr);
      } catch (_) {
        setIstTime(new Date().toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-meta">
        <span className="micro">
          <i className="live-dot"></i>
          INDEPENDENT CREATIVE CREW
        </span>

        {/* Real-time Studio Clock & Availability Badge */}
        <div className="hero-studio-live">
          <span className="studio-pulse-dot" aria-hidden="true"></span>
          <span className="micro">
            {istTime ? `${istTime} IST` : 'STUDIO ONLINE'} · ACTIVE &amp; ACCEPTING BRIEFS
          </span>
        </div>

        <span className="micro">BASED IN INDIA · WORKING EVERYWHERE</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="kicker-line"></span>
            FOR THE THINGS YOU'RE HERE TO DO
          </p>

          <h1 id="hero-title">
            EVERYONE<br />
            HAS THAT <em>ONE</em><br />
            <span className="day-line">
              DAY
              <span className="hero-star" aria-hidden="true">✳</span>
            </span>
          </h1>

          <div className="hero-lower">
            <p>
              That idea you've been carrying around? That thing you want to build, launch, change or show the world?
            </p>
            <p>
              <strong>Let's get the right people together and make it real.</strong>
            </p>
          </div>

          <div className="hero-buttons">
            <button 
              className="pill-button red-button" 
              type="button"
              onClick={onOpenContact}
            >
              LET'S TALK ABOUT YOURS <span>↗</span>
            </button>
            <a 
              className="under-link" 
              href="#work"
            >
              <span className="play-icon">↓</span>
              TAKE A LOOK AROUND
            </a>
          </div>

          <div className="hero-bottomnote">
            <span className="micro">01 / THE BEGINNING</span>
            <span>NO BIG EGOS. JUST BIG IDEAS.</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="A collage of campaign, photography and creative work">
          <div className="collage-orbit"></div>

          <div className="poster-tile">
            <span className="micro">ODC FIELD NOTES / 001</span>
            <b>
              MAKE<br />
              IT <i>MEAN</i><br />
              SOMETHING.
            </b>
            <span className="poster-doodle" aria-hidden="true">✳</span>
            <small>IDEAS ARE BETTER IN GOOD COMPANY.</small>
          </div>

          <figure className="photo-card photo-one">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85" 
              alt="Editorial portrait showcasing creative direction and styling" 
              loading="eager"
            />
            <figcaption>
              <span>01 / THE LOOK</span>
              <b>GIVE IT A POINT OF VIEW.</b>
            </figcaption>
          </figure>

          <figure className="photo-card photo-two">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85" 
              alt="Atmospheric warm cinematic photography capturing emotion" 
              loading="eager"
            />
            <figcaption>
              <span>02 / THE FEELING</span>
              <b>MAKE PEOPLE FEEL IT.</b>
            </figcaption>
          </figure>

          <div 
            className="sun-sticker"
            onClick={onOpenContact}
            role="button"
            tabIndex={0}
            title="Start your project with One Day Crew"
          >
            <span>GOOD THINGS</span>
            <b>TAKE A<br />CREW.</b>
            <i>↘</i>
          </div>

          <div className="hero-number" aria-hidden="true">01</div>
          <div className="collage-caption micro">A LITTLE BIT OF EVERYTHING. ALL IN IT TOGETHER.</div>
        </div>
      </div>

      <a className="scroll-cue" href="#manifesto">
        <span>SCROLL INTO THE STORY</span>
        <b>↓</b>
      </a>
    </section>
  );
}
