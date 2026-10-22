import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const Icon = toast.type === 'success' 
    ? CheckCircle2 
    : toast.type === 'warning' 
    ? AlertTriangle 
    : Info;

  return (
    <div className="toast-container" role="alert">
      <div className={`toast-box toast-${toast.type || 'info'}`}>
        <Icon size={18} className="toast-icon" />
        <span className="toast-text">{toast.message}</span>
        <button 
          onClick={onClose} 
          className="toast-close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
