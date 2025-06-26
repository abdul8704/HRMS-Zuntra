import React, { useState } from "react";

const generateLightColors = () => {
  const colors = [];
  for (let i = 0; i < 50; i++) {
    const hue = Math.floor((i * 360) / 50);
    colors.push(`hsl(${hue}, 80%, 85%)`);
  }
  return colors;
};

export const AddRolePopup = ({ onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#f5f5f5");
  const [showAllColors, setShowAllColors] = useState(false);

  const colors = generateLightColors();
  const visibleColors = showAllColors ? colors : colors.slice(0, 5);

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

          <div className="color-circles-container">
            {visibleColors.map((color, idx) => (
              <div
                key={idx}
                className={`color-circle ${roleColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setRoleColor(color)}
              />
            ))}
          </div>

          <button
            className="toggle-btn"
            onClick={() => setShowAllColors(!showAllColors)}
          >
            {showAllColors ? "Show Less" : "Show More"}
          </button>

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
    flex-direction: column;
    gap: 0.5rem; /* Reduced gap */
    padding: 1rem; /* Reduced padding */
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1.25rem rgba(0,0,0,0.1);
    width: 90%;
    max-width: 18.75rem; /* 300px */
  }

  .close-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.25rem; /* slightly smaller */
    cursor: pointer;
  }

  .role-input {
    padding: 0.375rem 0.75rem; /* reduced padding */
    border-radius: 1rem;
    border: none;
    background: #e2e2e2;
    color: #333;
    outline: none;
    font-size: 0.95rem;
  }

  .color-circles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .color-circle {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    border: 0.125rem solid transparent;
    transition: border 0.2s ease;
  }

  .color-circle.selected {
    border: 0.125rem solid #333;
  }

  .toggle-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 0.7rem;
    align-self: flex-start;
    margin-top: -0.25rem;
  }

  .toggle-btn:hover {
    text-decoration: underline;
  }

  .add-btn {
    padding: 0.375rem 0.75rem;
    border-radius:0.5rem;
    background-color:  rgba(140, 221, 132, 0.8);
    cursor: pointer;
    font-size: 0.9rem;
    color: black;
    align-self: center;
  }

  .add-btn:hover {
    background-color: green;
    opacity:0.7;
    color:white;
  }
`}</style>

    </>
  );
};
