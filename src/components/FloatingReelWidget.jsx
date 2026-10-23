import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, X, Maximize2, Minimize2, Play, Pause } from 'lucide-react';

export default function FloatingReelWidget({ 
  videoSrc = "/video 01.webm", 
  clientName = "Butterly Bakery", 
  departments = ["Brand & Design", "Photo / Video", "Social", "Web", "Sales"],
  onOpenProject 
}) {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented, retain muted state
          setIsMuted(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button 
        type="button" 
        className="floating-reel-pill-minimized"
        onClick={() => setIsMinimized(false)}
        title="Open Proof of Work Reel"
        aria-label="Expand proof of work reel"
      >
        <span className="live-dot" />
        <span className="pill-text">PROOF OF WORK · {clientName}</span>
        <span className="pill-open-arrow">↗</span>
      </button>
    );
  }

  return (
    <aside 
      className={`floating-reel-container ${isExpanded ? 'is-expanded' : ''}`}
      aria-label="Proof of work vertical reel player"
    >
      {/* Top Header Tag */}
      <div className="floating-reel-header">
        <div className="floating-reel-tag">
          <span className="live-dot pulse" />
          <span className="tag-client">PROOF OF WORK</span>
          <span className="tag-dept">· ON SET</span>
        </div>
        <div className="floating-reel-actions">
          <button 
            type="button" 
            className="f-reel-icon-btn" 
            onClick={toggleExpanded} 
            title={isExpanded ? "Collapse size" : "Expand size"}
            aria-label={isExpanded ? "Collapse reel size" : "Expand reel size"}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button 
            type="button" 
            className="f-reel-icon-btn" 
            onClick={() => setIsMinimized(true)} 
            title="Minimize to pill"
            aria-label="Minimize reel to pill"
          >
            –
          </button>
          <button 
            type="button" 
            className="f-reel-icon-btn" 
            onClick={() => setIsOpen(false)} 
            title="Close video"
            aria-label="Close proof reel"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 9:16 Video Canvas */}
      <div 
        className="floating-reel-frame"
        onClick={togglePlay}
        title="Tap to Play/Pause"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="floating-reel-video"
        />

        {/* Play/Pause center overlay indicator */}
        {!isPlaying && (
          <div className="floating-reel-paused-indicator">
            <Play size={28} fill="currentColor" />
          </div>
        )}

        {/* Gradient dark scrim for readable text */}
        <div className="floating-reel-gradient-bottom" />

        {/* Video Bottom Info Overlay */}
        <div className="floating-reel-bottom-info">
          <div className="client-badge-row">
            <span className="client-badge-name">{clientName}</span>
            <button 
              type="button" 
              className="f-reel-mute-btn" 
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{isMuted ? "TAP FOR AUDIO" : "SOUND ON"}</span>
            </button>
          </div>

          <p className="floating-reel-caption">
            Behind the scenes: Real craft across 5 departments.
          </p>

          {/* 5 Departments Mini-Tags */}
          <div className="floating-reel-depts">
            {departments.map((dept, i) => (
              <span key={i} className="reel-dept-chip">{dept}</span>
            ))}
          </div>

          {onOpenProject && (
            <button 
              type="button" 
              className="floating-reel-project-link"
              onClick={(e) => {
                e.stopPropagation();
                onOpenProject();
              }}
            >
              <span>View Full Case Study</span>
              <span className="arrow">↗</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
