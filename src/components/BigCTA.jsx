import React from 'react';

export default function BigCTA({ onOpenContact }) {
  return (
    <section className="big-cta">
      <div className="cta-scribble" aria-hidden="true">✳</div>
      
      <div className="cta-inner">
        <span className="micro">07 / YOUR MOVE</span>
        <h2>
          YOUR ONE DAY<br />
          ISN'T GOING TO<br />
          <i>MAKE ITSELF.</i>
        </h2>
        <p>
          Whatever you're working towards, you don't have to figure it all out alone.
        </p>
        
        <button 
          className="cta-button" 
          type="button"
          onClick={onOpenContact}
        >
          <span>LET'S START WITH A CONVERSATION</span>
          <b>↗</b>
        </button>

        <span className="cta-note micro">NO PRESSURE. NO PERFECT BRIEF NEEDED.</span>
      </div>

      <div className="cta-sideword" aria-hidden="true">
        TOGETHER<br />
        LOOKS GOOD<br />
        ON YOU.
      </div>
    </section>
  );
}
