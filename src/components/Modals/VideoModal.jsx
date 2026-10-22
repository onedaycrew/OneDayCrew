import React, { useEffect, useRef } from 'react';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="video-overlay is-open" 
      id="videoOverlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="videoTitle"
      onClick={(e) => {
        if (e.target.id === 'videoOverlay') {
          onClose();
        }
      }}
    >
      <button 
        className="video-close" 
        id="videoClose" 
        type="button"
        aria-label="Close video modal"
        onClick={onClose}
      >
        ×
      </button>

      <div className="video-modal-inner">
        <span className="micro">ODC / MOVING IMAGE STUDY</span>
        <h2 id="videoTitle">SAMPLE SHOWREEL</h2>
        
        <video 
          ref={videoRef}
          id="modalVideo" 
          controls 
          playsInline 
          poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-young-man-recording-with-a-camera-on-a-set-44069-large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support HTML5 video streaming.
        </video>

        <p>
          This is sample footage demonstrating dynamic editorial pacing and layout. Replace it with your approved showreel video reel before official launch.
        </p>
      </div>
    </div>
  );
}
