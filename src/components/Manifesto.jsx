import React from 'react';

export default function Manifesto({ onOpenContact }) {
  return (
    <section className="manifesto section-pad" id="manifesto">
      <div className="section-tag">
        <span className="micro">02 / THE REASON</span>
        <span className="rule"></span>
        <span className="micro">A SHARED KIND OF AMBITION</span>
      </div>

      <div className="manifesto-grid">
        <h2>
          NOT EVERY<br />
          ONE DAY<br />
          <span>LOOKS THE</span><br />
          <i>SAME.</i>
        </h2>

        <div className="manifesto-right">
          <div className="orbit-stamp">
            ODC<br />
            <span>✳</span>
            <small>EST. FOR<br />WHAT'S NEXT</small>
          </div>

          <p className="manifesto-lead">
            For some, it's opening the doors. For others, it's finally putting the work out there.
          </p>

          <p>
            It could be a brand, a film, a campaign, a new chapter. The destination is different. The feeling is familiar: there's something you want to make happen.
          </p>

          <p>
            We built One Day Crew for that moment — a growing crew of creatives, makers and marketers who come together around the idea, not a one-size-fits-all package.
          </p>

          <button 
            className="text-cta" 
            type="button"
            onClick={onOpenContact}
          >
            WHAT'S YOUR ONE DAY? <span>↗</span>
          </button>
        </div>
      </div>

      <div className="manifesto-ribbon">
        <span>YOUR IDEA, YOUR PEOPLE, YOUR ONE DAY.</span>
        <b>✳</b>
        <span>WE JUST HELP BRING IT CLOSER.</span>
      </div>
    </section>
  );
}
