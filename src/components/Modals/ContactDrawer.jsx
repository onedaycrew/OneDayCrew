import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { saveLead } from '../../lib/supabaseClient';

const WHATSAPP_NUMBER = '919353736101';

export default function ContactDrawer({ 
  isOpen, 
  onClose, 
  selectedService, 
  onSuccessToast 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Websites'
  });
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);

    const userName = formData.name.trim();
    const userPhone = formData.phone.trim();
    const userService = formData.service || 'Websites';

    // 1. Instantly save lead in Supabase in background
    try {
      await saveLead({
        name: userName,
        phone: userPhone,
        service: userService
      });
    } catch (err) {
      console.warn('Lead storage fallback triggered:', err);
    }

    // 2. Prepare WhatsApp clean text message (no emojis)
    const waText = encodeURIComponent(
      `Hi One Day Crew,\n\n` +
      `Name: ${userName}\n` +
      `Phone: ${userPhone}\n` +
      `Requirement: ${userService}\n\n` +
      `Let's connect and discuss this.`
    );

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

    onSuccessToast?.('Lead captured! Opening WhatsApp...');

    // 3. Direct to WhatsApp with ready-to-send message
    setTimeout(() => {
      setSubmitting(false);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }, 200);
  };

  const handleDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent(
      `Hi One Day Crew! I'm interested in discussing a project (${formData.service || 'Creative Work'}).`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleMailClick = () => {
    const subject = encodeURIComponent(
      `Project Enquiry — ${formData.service || 'Creative Work'}${formData.name ? ` (${formData.name})` : ''}`
    );
    const body = encodeURIComponent(
      `Hi One Day Crew,\n\n` +
      `I'd like to discuss a project with your team.\n\n` +
      `Name: ${formData.name || '[Your Name]'}\n` +
      `Phone: ${formData.phone || '[Your Phone/WhatsApp]'}\n` +
      `Service: ${formData.service || 'Websites & Web Apps'}\n\n` +
      `Looking forward to hearing from you!`
    );
    window.location.href = `mailto:hello@onedaycrew.studio?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="contact-overlay is-open" 
      id="contactOverlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="contactTitle"
    >
      <button 
        className="contact-backdrop" 
        id="contactBackdrop" 
        type="button"
        aria-label="Close contact panel"
        onClick={onClose}
      ></button>

      <section className="contact-panel">
        <div className="contact-panel-head">
          <span className="micro">ODC® / ZERO FRICTION ENQUIRY</span>
          <button 
            className="contact-close" 
            id="contactClose" 
            type="button"
            aria-label="Close contact panel"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="contact-panel-body">
          <span className="brief-sticker">QUICK CONNECT ↘ DIRECT TO WHATSAPP</span>
          <h2 id="contactTitle">
            TELL US<br />
            YOUR <i>ONE DAY.</i>
          </h2>
          <p>
            Zero friction. Drop your name and number below — your enquiry is instantly recorded and opens directly in WhatsApp with a ready-to-send message.
          </p>

          {/* Quick Direct 1-Tap WhatsApp CTA */}
          <button
            type="button"
            className="direct-whatsapp-pill"
            onClick={handleDirectWhatsApp}
            title="Instant WhatsApp Chat"
          >
            <span className="wa-icon-circle">
              <MessageSquare size={16} />
            </span>
            <span className="wa-text-col">
              <b>Skip the form — Chat instantly on WhatsApp</b>
              <small>Average reply time: Instant !!!</small>
            </span>
            <ArrowRight size={16} className="wa-arrow" />
          </button>

          <div className="or-divider">
            <span>OR SEND YOUR DETAILS</span>
          </div>

          <form id="briefForm" onSubmit={handleSubmit}>
            <label>
              YOUR NAME *
              <input 
                ref={nameInputRef}
                name="name" 
                id="yourName" 
                placeholder="e.g. Rahul Sharma" 
                required 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </label>

            <label>
              PHONE NUMBER / WHATSAPP *
              <input 
                name="phone" 
                id="yourContact" 
                type="tel"
                placeholder="e.g. +91 98765 43210" 
                required 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>

            <label>
              PROJECT INTEREST / CATEGORY
              <select 
                name="service" 
                id="yourProject" 
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Websites & Web Apps">Websites & Web Apps</option>
                <option value="Brand Identity & Design">Brand Identity & Design</option>
                <option value="Real Estate & Digital Platforms">Real Estate & Digital Platforms</option>
                <option value="Product Design & Mobile Apps">Product Design & Mobile Apps</option>
                <option value="Influencer & Event Coverage">Influencer & Event Coverage (Creator Circle)</option>
                <option value="Brand Identity & Packaging">Brand Identity & Packaging (Butcherly)</option>
                <option value="Performance & Digital Marketing">Performance & Digital Marketing</option>
                <option value="Video Production & Photography">Video Production & Photography</option>
                <option value="Full Scale Creative Direction">Full Scale Creative Direction</option>
                <option value="Careers / Work with the Crew">Careers / Work with the Crew</option>
                <option value="Other / General Enquiry">Other / General Enquiry</option>
              </select>
            </label>

            <button 
              className="pill-button red-button submit-button" 
              type="submit"
              disabled={submitting}
            >
              <span>{submitting ? 'RECORDING & CONNECTING...' : "CONNECT ON WHATSAPP"}</span>
              <span>↗</span>
            </button>

            <div className="lead-trust-badge">
              <ShieldCheck size={14} />
              <span>Saved securely. We never spam.</span>
            </div>
          </form>

          {/* Quick Direct Email Link */}
          <div className="direct-email-card" style={{ marginTop: '24px' }}>
            <span>Prefer email? Direct studio inbox:</span>
            <button 
              type="button" 
              className="copy-email-btn"
              onClick={handleMailClick}
              title="Click to send email"
            >
              <code>hello@onedaycrew.studio</code>
              <Mail size={14} />
            </button>
          </div>
        </div>

        <div className="contact-panel-foot">
          <span>EVERYONE HAS THAT ONE DAY.</span>
          <span>THIS COULD BE IT. ✳</span>
        </div>
      </section>
    </div>
  );
}
