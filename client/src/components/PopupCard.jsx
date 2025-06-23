import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const PopupCard = ({ 
  isVisible, 
  onClose, 
  type = 'success', 
  title = 'Success', 
  message = 'Operation completed successfully', 
  duration = 5000,
  color = '#10B981', // Default green color
  position = 'top-right' // top-right, top-left, bottom-right, bottom-left
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

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
        return <CheckCircle style={{ width: '24px', height: '24px', color }} />;
      case 'info':
        return <Info style={{ width: '24px', height: '24px', color }} />;
      case 'warning':
        return <AlertTriangle style={{ width: '24px', height: '24px', color }} />;
      case 'error':
        return <XCircle style={{ width: '24px', height: '24px', color }} />;
      default:
        return <CheckCircle style={{ width: '24px', height: '24px', color }} />;
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      default:
        return { top: '20px', right: '20px' };
    }
  };

  // Convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  if (!show) return null;

  const isRight = position.includes('right');
  const translateX = animate ? '0' : (isRight ? '100%' : '-100%');
  const opacity = animate ? '1' : '0';

  return (
    <div 
      style={{
        position: 'fixed',
        ...getPositionStyles(),
        zIndex: 9999,
        transform: `translateX(${translateX})`,
        opacity: opacity,
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'auto'
      }}
    >
      {/* White background card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
      }}>
        {/* Colored overlay card */}
        <div 
          style={{ 
            position: 'relative',
            borderRadius: '8px',
            border: `2px solid ${color}`,
            padding: '12px',
            minWidth: '256px',
            maxWidth: '384px',
            backgroundColor: hexToRgba(color, 0.1)
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: color,
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Content */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            paddingRight: '20px'
          }}>
            {/* Icon */}
            <div style={{
              flexShrink: 0,
              marginTop: '2px'
            }}>
              {getIcon()}
            </div>

            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 
                style={{ 
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '1.2',
                  margin: '0 0 4px 0',
                  color: color
                }}
              >
                {title}
              </h3>
              <p 
                style={{ 
                  fontSize: '14px',
                  lineHeight: '1.4',
                  margin: 0,
                  wordBreak: 'break-words',
                  whiteSpace: 'pre-wrap',
                  color: color
                }}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};