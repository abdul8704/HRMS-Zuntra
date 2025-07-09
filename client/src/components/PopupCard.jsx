import React, { useState, useEffect } from 'react';

export const PopupCard = ({
  isVisible,
  onClose = () => {},
  type = 'info',
  title = 'Notification',
  message = '',
  duration = 5000,
  color
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  const defaultColors = {
    success: '#b4edb2',
    info: '#c1e3f5',
    warning: '#fcc190',
    error: '#f5a19f',
    notification: '#fafca7'
  };

  const resolvedColor = color || defaultColors[type] || '#444';

  // Proper darken logic
  const darkenColor = (hex, amount = 60) => {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return hex;

    let num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00FF) - amount;
    let b = (num & 0x0000FF) - amount;

    return `rgb(${Math.max(r, 0)}, ${Math.max(g, 0)}, ${Math.max(b, 0)})`;
  };

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);

      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 300);
  };

  const getIcon = () => {
    const style = { width: 24, height: 24, fill: '#000' };
    switch (type) {
      case 'success': return <svg {...style}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
      case 'info': return <svg {...style}><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>;
      case 'warning': return <svg {...style}><path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-4h-2v4h2v-4z"/></svg>;
      case 'error': return <svg {...style}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 1.41L12 13.41 8.41 16.99 7 15.59 10.59 12 7 8.41 8.41 7l3.59 3.59L15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>;
      case 'notification': return <svg {...style}><circle cx="12" cy="12" r="10"/></svg>;
      default: return null;
    }
  };

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '2vh',
        right: '2vw',
        zIndex: 9999,
        visibility: animate ? 'visible' : 'hidden',
        opacity: animate ? 1 : 0,
        transform: `translateX(${animate ? '0' : '100%'})`,
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          border: `3px solid ${darkenColor(resolvedColor)}`,
          boxShadow: '0 0.75rem 1.5rem rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '24rem'
        }}
      >
        <div
          style={{
            backgroundColor: resolvedColor,
            padding: '1rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {getIcon()}
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#000' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#111', lineHeight: 1.4 }}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
