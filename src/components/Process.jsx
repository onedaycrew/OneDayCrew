import React from 'react';
import { PROCESS_STEPS } from '../data/content';

export default function Process() {
  return (
    <section className="how section-pad" id="story">
      <div className="section-tag">
        <span className="micro">06 / HOW THE CREW COMES TOGETHER</span>
        <span className="rule"></span>
        <span className="micro">NO SOLO ACTS REQUIRED</span>
      </div>

      <div className="how-heading">
        <h2>
          GOOD WORK<br />
          IS A <em>TEAM</em><br />
          SPORT.
        </h2>
        <p>
          We pull in the right mix of thinkers and makers for every brief. No unnecessary layers. No pretending one person can do everything. Just people who care about getting it right.
        </p>
      </div>

      <div className="crew-steps">
        {PROCESS_STEPS.map((step) => (
          <article key={step.step}>
            <span className="step-num">{step.step}</span>
            <div className={`step-icon ${step.step === '01' ? 'icon-listen' : step.step === '02' ? 'icon-people' : 'icon-go'}`} aria-hidden="true">
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className="micro">{step.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
