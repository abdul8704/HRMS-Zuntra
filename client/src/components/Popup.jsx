import React, { useState, useEffect } from 'react';
// EXAMPLE USAGE OF POPUP COMPONENT
// <Popup
//   message="Custom notification color!"
//   color={{
//     background: "#fff3cd",
//     border: "#ffeeba",
//     text: "#856404"
//   }}
// /> 
export const Popup = ({ message, color }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const customStyle = {
    backgroundColor: color?.background || '#e0f7fa',
    borderColor: color?.border || '#00acc1',
    color: color?.text || '#006064'
  };

  return (
    <div className="popup" style={customStyle}>
      <div className="popup-content">
        <span className="popup-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        </span>
        <span className="popup-message">{message}</span>
      </div>
      <style jsx>{`
      .popup {
  position: fixed;
  top: 15%;
  right: 2rem;
  padding: 1rem 1.25rem;
  border: 0.0625rem solid;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  max-width: 30%;
}

.popup-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.popup-icon {
  font-size: 1.125rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.popup-message {
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: pre-line;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`}</style>
    </div>
  );
};


