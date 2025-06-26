import React, { useState, useRef } from "react";

export const AddRolePopup = ({ onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#000000");
  const colorInputRef = useRef(null);

  const handleColorCircleClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    console.log("Role:", roleName, "Color:", roleColor);
    onClose();
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="close-btn" onClick={onClose}>×</button>

          <input
            type="text"
            className="role-input"
            placeholder="Enter role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />

          <div className="color-picker-wrapper">
            <div
              className="color-circle"
              style={{ backgroundColor: roleColor }}
              onClick={handleColorCircleClick}
            ></div>

            <input
              type="color"
              ref={colorInputRef}
              className="color-input"
              value={roleColor}
              onChange={(e) => setRoleColor(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={handleSubmit}>Add</button>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .popup-container {
          position: relative;
          background: white;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 0.25rem 1.25rem rgba(0,0,0,0.1);
        }

        .close-btn {
          position: absolute;
          top: 0.0625rem;
          right: 0.5rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .role-input {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          border: none;
          background: #e2e2e2;
          color: #333;
          outline: none;
          font-size: 1rem;
        }

        .color-picker-wrapper {
          position: relative;
        }

        .color-circle {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          cursor: pointer;
          border: 0.125rem solid #ccc;
        }

        .color-input {
          position: absolute;
          top: 2.5rem;
          left: 0;
          opacity: 0;
          pointer-events: none;
        }

        .color-input:focus {
          opacity: 1;
          pointer-events: all;
        }

        .add-btn {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          border: 0.0625rem solid #9ea5a0;
          background: transparent;
          cursor: pointer;
          font-size: 1rem;
          color: #333;
        }

        .add-btn:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  );
};
