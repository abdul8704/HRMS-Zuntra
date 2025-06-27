import React from "react";

export const EmpCourseCard = ({ courseName, authorName, imageUrl, onRemove }) => {
  return (
    <div className="emp-course-card">
      <div className="remove-icon" onClick={onRemove}>×</div>

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

      <style>{`
        .emp-course-card {
          display: flex;
          align-items: center;
          background-color: #c3dad7;
          border-radius: 999rem;
          padding: 0.1rem 0.6rem 0.1rem 0.3rem; /* Tight padding */
          max-width: 11.25rem;
          position: relative;
          gap: 0.4rem;
          font-family: sans-serif;
        }

        .remove-icon {
          position: absolute;
          top: 0.1rem;
          right: 0.5rem;
          font-size: 0.75rem;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          z-index: 10;
        }

        .course-image {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .course-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem; /* Reduced gap */
          max-width: 8.5rem;
          line-height: 1.1;
        }

        .tooltip-wrapper {
          position: relative;
          display: inline-block;
        }

        .text {
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .course-title {
          font-weight: 600;
          font-size: 0.75rem;
          color: #111;
        }

        .course-author {
          font-size: 0.65rem;
          color: #555;
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
      `}</style>
    </div>
  );
};
