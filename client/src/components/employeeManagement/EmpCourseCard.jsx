import React from "react";

export const EmpCourseCard = ({ courseName, authorName, imageUrl, onRemove }) => {
  return (
    <div className="emp-course-card">
      <img src={imageUrl} alt="course" className="course-image" />

      <div className="course-text">
        <div className="tooltip-wrapper">
          <span className="text course-title">{courseName}</span>
          <span className="tooltip">{courseName}</span>
        </div>
        <div className="tooltip-wrapper">
          <span className="text course-author">{authorName}</span>
          <span className="tooltip">{authorName}</span>
        </div>
      </div>

      {onRemove && <div className="remove-icon" onClick={onRemove}>×</div>}

      <style>{`
        .emp-course-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 0.5rem 1rem;
  gap: 0.6rem;
  font-family: sans-serif;
  max-width: 11rem;
  flex: 1 1 11rem; /* Allows wrap and spacing */
  box-sizing: border-box;
  position: relative;
  border-radius: 0.5rem;
}




        .course-image {
          width: clamp(1.4rem, 4vw, 2rem);
          height: clamp(1.4rem, 4vw, 2rem);
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          align-item:flex-start;
        }

        .course-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
          min-width: 0;
          align-items: flex-start; /* 🔽 Align text to left */
        }

        .tooltip-wrapper {
          position: relative;
          width: 100%;
        }

        .text {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(0.6rem, 1vw, 0.85rem);
        }

        .course-title {
          font-weight: 600;
          color: #111;
        }

        .course-author {
          color: #555;
        }

        .remove-icon {
  position: absolute;
  top: 0.3rem;
  right: 0.4rem;
  font-size: clamp(0.75rem, 1vw, 1rem);
  font-weight: bold;
  color: #333;
  cursor: pointer;
  z-index: 5;
}


        .tooltip {
          visibility: hidden;
          opacity: 0;
          background-color: #000;
          color: #fff;
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          font-size: 0.65rem;
          white-space: nowrap;
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .tooltip-wrapper:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }

        @media (max-width: 480px) {
          .emp-course-card {
            padding: 0.4rem 0.6rem;
            border-radius: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
