import React, { useState } from "react";

export const EditRolePopup = ({ role, members, color, onClose, onSave }) => {
  const [editRole, setEditRole] = useState(role);
  const [editMembers, setEditMembers] = useState(members);
  const [editColor, setEditColor] = useState(color);
  const [showAllColors, setShowAllColors] = useState(false);

  const colorOptions = [
    "#ffe0dc", "#ffd8be", "#ffe29a", "#e8f1d4", "#d9f8f5",
    "#d0e2ff", "#e0d6ff", "#f3d1f4", "#e2e2e2", "#fdf5e6",
    "#fce4ec", "#e3f2fd", "#f0f4c3", "#dcedc8", "#c8e6c9",
    "#b2ebf2", "#b2dfdb", "#d1c4e9", "#f8bbd0", "#ffccbc",
    "#ffe0b2", "#fff9c4", "#f0f4c3", "#f1f8e9", "#e8f5e9",
    "#e0f7fa", "#e0f2f1", "#ede7f6", "#f3e5f5", "#fce4ec",
    "#ffebee", "#fafafa", "#e6f7ff", "#f9fbe7", "#f3f3f3",
    "#ebf5fb", "#d4efdf", "#f6ddcc", "#fdebd0", "#f9e79f",
    "#f5cba7", "#aed6f1", "#a9dfbf", "#f5b7b1", "#f8c471",
    "#d7bde2", "#aed6f1", "#abebc6", "#f9e79f", "#fadbd8",
  ];

  const visibleColors = showAllColors ? colorOptions : colorOptions.slice(0, 5);

  const handleSave = () => {
    onSave({
      role: editRole,
      members: editMembers,
      color: editColor,
    });
    onClose();
  };

  return (
    <>
      <div className="edit-popup-overlay">
        <div className="edit-popup">
          <button className="close-btn" onClick={onClose}>×</button>
          <div className="edit-content">
            <label>Role:</label>
            <input
              type="text"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            />

            <label>No. of Members:</label>
            <input
              type="number"
              value={editMembers}
              onChange={(e) => setEditMembers(e.target.value)}
            />

            <label>Color:</label>
            <div className="color-grid">
              {visibleColors.map((clr, idx) => (
                <div
                  key={idx}
                  className={`color-swatch ${editColor === clr ? 'selected' : ''}`}
                  style={{ backgroundColor: clr }}
                  onClick={() => setEditColor(clr)}
                />
              ))}
            </div>
            {!showAllColors ? (
  <button className="show-more-btn" onClick={() => setShowAllColors(true)}>
    Show more
  </button>
) : (
  <button className="show-more-btn" onClick={() => setShowAllColors(false)}>
    Show less
  </button>
)}


            <button className="change-btn" onClick={handleSave}>Change</button>
          </div>
        </div>
      </div>

      <style>{`
        .edit-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
        }

        .edit-popup {
          background: #fff;
          border-radius: 1rem;
          padding: 2rem;
          width: 20rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.3);
        }

        .close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.75rem;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .edit-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .edit-content label {
          font-weight: 600;
        }

        .edit-content input[type="text"],
        .edit-content input[type="number"] {
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .color-swatch {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: transform 0.2s ease;
        }

        .color-swatch:hover {
          transform: scale(1.1);
        }

        .color-swatch.selected {
          border-color: rgb(0,0,0,0.5);
        }

        .show-more-btn {
          margin-top: 0.5rem;
          background: none;
          border: none;
          color: #0077cc;
          font-weight: normal;
          cursor: pointer;
          align-self: flex-start;
          font-size:0.75rem;
        }

        .change-btn {
          padding: 0.5rem 1rem;
          background-color: #40916c;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: bold;
          cursor: pointer;
          align-self: flex-end;
        }
      `}</style>
    </>
  );
};
