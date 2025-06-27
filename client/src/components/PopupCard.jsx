//HOW TO USE THIS
      // <PopupCard
      //   isVisible={showPopup}
      //   onClose={handleClosePopup}
      //   type="success"
      //   title="Action Successful"
      //   message="Your operation was completed successfully!"
      //   duration={4000} // Optional: Defaults to 5000ms
      //   // color is optional. If not provided, default based on type will be used.
      // />

import React, { useState, useEffect } from 'react';

export const PopupCard = ({
  isVisible,
  onClose,
  type,
  title,
  message,
  duration = 5000,
  color,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  const defaultColors = {
    success: '#4CAF50',      // green
    info: '#2196F3',         // blue
    warning: '#FF9800',      // orange
    error: '#F44336',        // red
    notification: '#9C27B0'  // purple
  };

  const resolvedColor = color || defaultColors[type] || '#333333';

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

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
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        );
      case 'notification':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!show) return null;

  const translateX = animate ? '0' : '100%';
  const opacity = animate ? '1' : '0';

  const darkenColor = (hex, percent) => {
    let num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) - percent;
    let g = ((num >> 8) & 0x00FF) - percent;
    let b = (num & 0x0000FF) - percent;

    r = r < 0 ? 0 : r;
    g = g < 0 ? 0 : g;
    b = b < 0 ? 0 : b;

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '2vh',
        right: '2vw',
        zIndex: 9999,
        transform: `translateX(${translateX})`,
        opacity: opacity,
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'auto'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1rem 2.5rem rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        border: `3.1px solid ${darkenColor(resolvedColor, 70)}`
      }}>
        <div
          style={{
            position: 'relative',
            backgroundColor: resolvedColor,
            padding: '1rem',
            minWidth: '18rem',
            maxWidth: '24rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              padding: '0.25rem',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'black',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ flexShrink: 0 }}>
              {getIcon()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', lineHeight: '1.3', margin: '0 0 0.25rem 0', color: '#000000' }}>
                {title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                lineHeight: '1.5',
                margin: 0,
                color: '#333333',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
