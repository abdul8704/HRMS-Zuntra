import React, { useState } from "react";

export const EditRolePopup = ({ role, members, color, onClose, onSave }) => {
  const [editRole, setEditRole] = useState(role);
  const [editMembers, setEditMembers] = useState(members);
  const [editColor, setEditColor] = useState(color);
  const [showPicker, setShowPicker] = useState(false);

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
            <div className="color-container">
              <div
                className="color-circle"
                style={{ backgroundColor: editColor }}
                onClick={() => setShowPicker(!showPicker)}
              />
              {showPicker && (
                <input
                  type="color"
                  className="color-picker"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                />
              )}
            </div>

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
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
          margin-bottom: 0.25rem;
        }

        .edit-content input[type="text"],
        .edit-content input[type="number"] {
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .color-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .color-circle {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          cursor: pointer;
          border: 1px solid #aaa;
        }

        .color-picker {
          position: absolute;
          top: 2.5rem;
          left: 0;
          border: none;
          background: transparent;
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
