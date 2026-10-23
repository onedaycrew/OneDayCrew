import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Manifesto from './components/Manifesto';
import ClientMarquee from './components/ClientMarquee';
import Showreel from './components/Showreel';
import WorkShowcase from './components/WorkShowcase';
import Services from './components/Services';
import Process from './components/Process';
import Careers from './components/Careers';
import BigCTA from './components/BigCTA';
import Footer from './components/Footer';

import MenuModal from './components/Modals/MenuModal';
import ProjectModal from './components/Modals/ProjectModal';
import VideoModal from './components/Modals/VideoModal';
import ContactDrawer from './components/Modals/ContactDrawer';
import FloatingReelWidget from './components/FloatingReelWidget';
import { PROJECTS } from './data/content';

import Toast from './components/UI/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('odc-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync theme attribute on <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('odc-theme', theme);
    } catch (_) {}

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#171525' : '#f5eee4';
    }
  }, [theme]);

  // Lock body scroll when any modal/drawer is open
  const isAnyOverlayOpen = menuOpen || contactOpen || videoOpen || !!selectedProject;
  useEffect(() => {
    if (isAnyOverlayOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [isAnyOverlayOpen]);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.section-tag, .manifesto-grid, .manifesto-ribbon, .reel-head, .reel-frame-wrap, .film-strip, .work-heading, .work-card, .work-bottom, .services-top, .service-row, .services-foot, .how-heading, .crew-steps article, .cta-inner, .client-trust-section, .careers-head, .roles-grid, .wildcard-pitch-card'
    );
    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

      targets.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    } else {
      targets.forEach(el => el.classList.add('is-visible'));
    }
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3800);
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next === 'dark' ? 'Dark Side' : 'Light Side'}`, 'info');
      return next;
    });
  };

  const handleOpenContact = (service = '') => {
    setSelectedService(service || "I'm still figuring it out");
    setContactOpen(true);
    setMenuOpen(false);
  };

  return (
    <div className="app-root">
      {/* Texture grain overlay */}
      <div className="grain" aria-hidden="true"></div>

      {/* Accessible skip link */}
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => handleOpenContact()}
        onOpenMenu={() => setMenuOpen(true)}
        menuOpen={menuOpen}
      />

      {/* Main Content */}
      <main id="main">
        <Hero onOpenContact={() => handleOpenContact()} />
        <Ticker />
        <Manifesto onOpenContact={() => handleOpenContact()} />
        <ClientMarquee />
        <Showreel onOpenVideo={() => setVideoOpen(true)} />
        <WorkShowcase 
          onSelectProject={(p) => setSelectedProject(p)} 
          onOpenContact={() => handleOpenContact()} 
        />
        <Services 
          onSelectService={(s) => handleOpenContact(s)} 
          onOpenContact={() => handleOpenContact()} 
        />
        <Process />
        <Careers onOpenContact={(role) => handleOpenContact(role)} />
        <BigCTA onOpenContact={() => handleOpenContact()} />
        <Footer onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Fullscreen Navigation Menu */}
      <MenuModal 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onOpenContact={() => handleOpenContact()} 
      />

      {/* Case Study Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onOpenContact={(svc) => handleOpenContact(svc)} 
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Showreel Video Modal */}
      <VideoModal 
        isOpen={videoOpen} 
        onClose={() => setVideoOpen(false)} 
      />

      {/* Slide-out Contact Brief Drawer */}
      <ContactDrawer 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
        selectedService={selectedService}
        onSuccessToast={(msg) => showToast(msg, 'success')}
      />

      {/* Global Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
