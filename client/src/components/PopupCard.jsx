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
        return <CheckCircle className="w-6 h-6" style={{ color }} />;
      case 'info':
        return <Info className="w-6 h-6" style={{ color }} />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6" style={{ color }} />;
      case 'error':
        return <XCircle className="w-6 h-6" style={{ color }} />;
      default:
        return <CheckCircle className="w-6 h-6" style={{ color }} />;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-20 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getAnimationClasses = () => {
    const isRight = position.includes('right');
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    if (animate) {
      return `${baseClasses} transform translate-x-0 opacity-100`;
    } else {
      return `${baseClasses} transform ${isRight ? 'translate-x-full' : '-translate-x-full'} opacity-0`;
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

  return (
    <div className={`fixed ${getPositionClasses()} z-50 ${getAnimationClasses()}`}>
      {/* White background card */}
      <div className="bg-white rounded-lg shadow-lg">
        {/* Colored overlay card */}
        <div 
          className="relative rounded-lg border-2 p-3 min-w-64 max-w-sm"
          style={{ 
            backgroundColor: hexToRgba(color, 0.1),
            borderColor: color 
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
            style={{ color }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex items-start space-x-2 pr-5">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 
                className="text-base font-semibold leading-tight mb-1"
                style={{ color }}
              >
                {title}
              </h3>
              <p 
                className="text-sm leading-relaxed break-words whitespace-pre-wrap"
                style={{ color }}
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