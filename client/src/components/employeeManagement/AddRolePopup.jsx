import React, { useState } from "react";
import {EmpCourseCard} from './EmpCourseCard'

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
  const [showColors, setShowColors] = useState(false);
  const [courseCard, setCourseCard] = useState(true);
  const colors = generateLightColors();

  const handleSubmit = () => {
    console.log("Role:", roleName, "Color:", roleColor);
    onClose();
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="role-color-row">
            <input
              type="text"
              className="role-input"
              placeholder="Enter role"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <div
              className="main-circle"
              style={{ backgroundColor: roleColor }}
              onClick={() => setShowColors(!showColors)}
            ></div>
          </div>

          {showColors && (
            <div className="color-circles-container">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setRoleColor(color);
                    setShowColors(false);
                  }}
                />
              ))}
            </div>
          )}

          <div className="course-box">
            <span className="box-title">Ongoing courses...</span>
            <span className="plus-circle" onClick={()=>setCourseCard(true)}>+</span>
          </div>
          {setCourseCard && <EmpCourseCard
  courseName="React Fundamentals"
  authorName="John Doe"
  imageUrl="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
  onRemove={() => handleRemove(index)}  // handleRemove function you define
/>}

          <div className="button-row">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="add-btn" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .popup-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 95%;
  max-width: 700px; /* Increased width */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}


        .role-color-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .role-input {
          flex: 1;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
        }

        .main-circle {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 2px solid #999;
          cursor: pointer;
        }

        .color-circles-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .color-circle {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
        }

          .course-box {
    background-color: #d9d9d9;
    border-radius: 10px;
    height: 18rem;  /* Increased height */
    width: 100%;    /* Full width of popup */
    position: relative;
    padding: 0.5rem 1rem;
  }
        .box-title {
          position: absolute;
          top: 0.8rem;
          left: 1rem;
          font-size: 1rem;
          color: #555;
        }

        .plus-circle {
          position: absolute;
          bottom: 0.8rem;
          right: 1rem;
          background: rgba(0, 128, 128, 0.15);
          border-radius: 50%;
          padding: 0.3rem 0.6rem;
          font-size: 1rem;
          color: #333;
          cursor: pointer;
        }

        .button-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .cancel-btn,
        .add-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
        }

         .cancel-btn {
          background-color: #f3f4f6;
          color: black;
          font-weight: normal;
        }

        .cancel-btn:hover {
          background-color: red;
          opacity: 0.5;
          color: white;
          font-weight: normal;
        }

        .add-btn {
          background-color: rgba(140, 221, 132, 0.8);
          color: black;
        }

        .add-btn:hover {
          background-color: green;
          color: white;
        }
      `}</style>
    </>
  );
};
