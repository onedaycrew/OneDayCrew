import React from 'react';

export default function Ticker() {
  const tickerItems = [
    { text: "EVERYONE HAS THAT ONE DAY.", type: "text" },
    { text: "✳", type: "glyph" },
    { text: "LET'S MAKE IT HAPPEN.", type: "text" },
    { text: "↗", type: "glyph" },
    { text: "GOOD THINGS TAKE A CREW.", type: "text" },
    { text: "✳", type: "glyph" },
    { text: "EVERYONE HAS THAT ONE DAY.", type: "text" },
    { text: "↗", type: "glyph" },
    { text: "LET'S MAKE IT HAPPEN.", type: "text" },
    { text: "✳", type: "glyph" }
  ];

  return (
    <section className="ticker" aria-label="Our philosophy">
      <div className="ticker-track">
        {/* Render segments multiple times for seamless, infinite continuous scrolling */}
        {[0, 1, 2, 3].map((segmentIndex) => (
          <div className="ticker-segment" key={segmentIndex} aria-hidden={segmentIndex > 0}>
            {tickerItems.map((item, idx) => (
              item.type === "glyph" ? (
                <b key={`${segmentIndex}-${idx}`} className="ticker-glyph">{item.text}</b>
              ) : (
                <span key={`${segmentIndex}-${idx}`} className="ticker-text">{item.text}</span>
              )
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
